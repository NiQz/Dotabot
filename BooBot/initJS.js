function containsRole(usr,rolename){
    var Roles = usr.Roles;
    for(var a = 0; a<Roles.length; a++){
        if(Roles[a].Name == rolename)
            return true;
    }
    return false;
}