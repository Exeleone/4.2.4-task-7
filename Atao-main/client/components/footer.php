<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
<?php 
if ($pageActive == 'about' || $pageActive == 'contacts') {
    if ($userRole == 'admin') {
    echo '<script src="https://cdn.tiny.cloud/1/xgda5cvu3oxu5yccv5vfqobl5pvie4jwkwkccj7a4pb9ojnz/tinymce/5/tinymce.min.js" referrerpolicy="origin"></script>';
    echo '<script src="/app/pageEditor.js" type="text/javascript"></script>';
    }
}
if ($pageActive == 'profile') {
    echo '<script src="/app/profile.js" type="text/javascript"></script>';
}
if ($pageActive == 'edit-users') {
    echo '<script src="/app/editUsers.js" type="text/javascript"></script>';
}
if ($pageActive == 'edit-disciplines') {
    echo '<script src="/app/editDisc.js" type="text/javascript"></script>';
}
if ($pageActive == 'my-grades') {
    echo '<script src="/app/myGrades.js" type="text/javascript"></script>';
}
if ($pageActive == 'disciplines') {
    echo '<script src="/app/disciplines.js" type="text/javascript"></script>';
}
if ($pageActive == 'groups') {
    echo '<script src="/app/groups.js" type="text/javascript"></script>';
}
?>

<script src="/app/app.js" type="text/javascript"></script>
