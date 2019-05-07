'use strict';

function recuperation(e){
    e.preventDefault();
    $.ajax({
        url:'recuperation.php',
        method:'post',
        data:{salle:salle},
        dataType:'json',
        sussess:function(data)
    });

}