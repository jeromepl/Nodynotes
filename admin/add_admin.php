<?php
if (isset($_POST['login']) AND isset($_POST['pass']))
{
    $login = $_POST['login'];
    //$pass = crypt($_POST['pass']); // Crypting password
    $pass = $_POST['pass'];

    file_put_contents(".htpasswd", "\n" . $login . ":" . $pass, FILE_APPEND);
    echo "Done!";
}

else //The form hasn't been filled yet
{
?>

<p>Enter your login and password:</p>

<form method="post">
    <p>
        Login : <input type="text" name="login"><br />
        Password : <input type="text" name="pass"><br /><br />

        <input type="submit" value="Add!">
    </p>
</form>

<?php
}
?>
