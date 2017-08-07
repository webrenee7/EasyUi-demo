/**
 * Created by XuYa on 2017/8/7.
 */
//设置登录窗口
function openPwd() {
    $('#w').window({
        title: '修改密码',//弹窗标题
        modal: true,//是否有遮罩
        shadow: true,//是否有弹窗阴影
        closed: true,//是否关闭弹窗
        resizable:false//弹窗是否能缩放
    });
}
//关闭登录窗口
function closePwd() {
    $('#w').window('close');
}
//修改密码
function serverLogin() {
    var oldPassword = $('#oldPassword').val();
    var newPassword = $('#newPassword').val();
    var confirmPassword = $('#confirmPassword').val();
    if (oldPassword == '') {
        msgShow('系统提示', '请输入原密码！', 'warning');
        return false;
    }
    if (newPassword == '') {
        msgShow('系统提示', '请输入新密码！', 'warning');
        return false;
    }
    if (confirmPassword == '') {
        msgShow('系统提示', '请再一次输入密码！', 'warning');
        return false;
    }
    if (newPassword != confirmPassword) {
        msgShow('系统提示', '新密码和确认密码不一至！请重新输入', 'warning');
        return false;
    }
    $.ajax({
        url:"login/updatePwd.do",
        type:"post",
        data:{oldPassword:oldPassword,newPassword:newPassword,confirmPassword:confirmPassword},
        dataType:"json",
        success:function(data){
            var code = data.code;
            var message = data.message;
            if(code == 0){
                msgShow('系统提示', '恭喜，密码修改成功！', 'info');
                $('#oldPassword').val("");
                $('#newPassword').val("");
                $('#confirmPassword').val("");
                closePwd();
            }else if(code == 202){
                msgShow('系统提示', '参数非法！', 'warning');
            }else if(code == 221){
                msgShow('系统提示', '原密码错误！', 'warning');
            }else if(code == 225){
                msgShow('系统提示', '新密码和确认密码不一至！', 'warning');
            }
        }
    });

}
//退出操作
$(function() {
    openPwd();
    $('#editpass').click(function() {//点击修改密码
        $('#w').window('open');
    });
    $('#btnEp').click(function() {//修改密码点击确定
        serverLogin();
    })
    $('#btnCancel').click(function(){closePwd();})//修改密码点击取消
    $('#loginOut').click(function() {//安全退出
        $.messager.confirm('系统提示', '您确定要退出本次登录吗?', function(r) {
            if (r) {
                $.ajax({
                    url:"login/logout.do",
                    type:"get",
                    dataType:"json",
                    success:function(data){
                        window.location.href=path+"/login";
                    }
                });
            }
        });
    })
});