$(document).ready(function () {
    $('#loginForm').submit(function (event) {
        event.preventDefault();
        let username = $('#username').val().trim();
        let password = $('#password').val().trim();

        // Simple form validation
        if (username === '' || password === '') {
            showMessage("error", "请输入用户名和密码。", "message", 3000);
            return;
        }

        let formData = {
            username: username,
            password: password
        };

        $.ajax({
            type: 'POST',
            url: loginPlayerUrl,
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function (response) {
                if (response.code === 0) {
                    window.location.replace(dashboardPlayerUrl);
                } else {
                    showMessage("error", response.message, "message", 3000);
                }
            },
            error: function () {
                showMessage("error", "网络错误，请稍后再试。", "message", 3000);
            }
        });
    });

    $('#anonymousLoginButton').click(function () {
        let guestData = {
            username: 'Anonymous',
            password: 'Anonymous'
        };

        $.ajax({
            type: 'POST',
            url: loginPlayerUrl,
            data: JSON.stringify(guestData),
            contentType: 'application/json',
            success: function (response) {
                if (response.code === 0) {
                    window.location.replace(rootPlayerUrl);
                } else {
                    showMessage("error", response.message, "message", 3000);
                }
            },
            error: function () {
                showMessage("error", "网络错误，请稍后再试。", "message", 3000);
            }
        });
    });
});
