firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var user = firebase.auth().currentUser;

        if (user != null) {
            $('#user_email').text(user.email);
            $('#header-name').text(user.displayName.toUpperCase());
            $('#user_dname').text(user.displayName);
            $('.profile-edit-btn').css('display', 'block');
            firebase.database().ref().child("users").child(user.uid).get().then(function (snapshot) {
                if (snapshot.exists()) {
                    $('#user_phone').text(snapshot.val().phone);
                    $('#user_address').text(snapshot.val().address);
                }
                else {
                    console.log("No data available for user");
                }
            }).catch(function (error) {
                console.error(error);
            });

            firebase.database().ref().child("cart/" + user.uid).get().then(function (snapshot) {
                if (snapshot.exists()) {
                    var myCartids = Object.keys(snapshot.val());
                    var myCart = snapshot.val();
                    console.log(myCartids);
                    console.log(myCart);
                    var overall = 0;
                    firebase.database().ref().child("products").get().then(function (snapshot2) {
                        if (snapshot2.exists()) {
                            var products = snapshot2.val();
                            for (let index = 0; index < myCartids.length; index++) {
                                const prod_id = myCartids[index];

                                console.log(products[prod_id]);

                                var html = '<div class="row">' +
                                    '<input type="hidden" class="inputid" value="' + prod_id + '"/>' +
                                    '<div class="col-md-3">' +
                                    '<label class="prod_name">' + products[prod_id].name + '</label>' +
                                    '</div>' +
                                    '<div class="col-md-3">' +
                                    '<label class="prod_amount">' + myCart[prod_id].amount + '</label>' +
                                    '</div>' +
                                    '<div class="col-md-3">' +
                                    '$<span class="prod_price">' + products[prod_id].price + '</span>' +
                                    '</div>' +
                                    '<div class="col-md-3">' +
                                    '$<span class="prod_price_total">' + myCart[prod_id].amount * products[prod_id].price + '</span>' +
                                    '<a class="delete_prod ml-4" href="#" data-toggle="tooltip" data-placement="top" title="Remove from cart"><i class="far fa-times-circle text-danger"></i></a>' +
                                    '</div>' +
                                    '</div>'
                                overall += myCart[prod_id].amount * products[prod_id].price;
                                $('#cart').append(html);
                            }
                            $('#overall_price').text(overall);
                        }
                        else {
                            console.log("No data available");
                        }
                    }).catch(function (error) {
                        console.error(error);
                    });
                }
                else {
                    console.log("No data available for user");
                }
            }).catch(function (error) {
                console.error(error);
            });
        }
    } else {
        // No user is signed in.
        $('.profile-edit-btn').css('display', 'none');
    }
});

$('.profile-edit-btn').click(function () {
    $('.editProf').toggle('d-block');
});

$('#change_dname').click(function () {
    var new_dname = prompt("Enter new username:");
    if (new_dname == null || new_dname == '') {
        alert('Operation cancelled');
    }
    else {
        var user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: new_dname
        }).then(function () {
            // Update successful.
            console.log("username set successfully");
            location.reload();
        }).catch(function (error) {
            window.alert("Error: " + error.message)
        });
    }
});

$('#change_phone').click(function () {
    var user = firebase.auth().currentUser;
    var new_phone = prompt("Enter new phone:");
    if (new_phone == null || new_phone == '') {
        alert('Operation cancelled');
    }
    else {
        firebase.database().ref('users/' + user.uid).update({
            phone: new_phone
        }).then(function () {
            location.reload();
        });
    }
});

$('#change_address').click(function () {
    var user = firebase.auth().currentUser;
    var new_address = prompt("Enter new address:");
    if (new_address == null || new_address == '') {
        alert('Operation cancelled');
    }
    else {
        firebase.database().ref('users/' + user.uid).update({
            address: new_address
        }).then(function () {
            location.reload();
        });
    }
});

$('#cart').on('click', '.delete_prod', function (event) {
    var prod_id = $(this).parent().parent().find('.inputid').val();
    console.log(prod_id);
    var user = firebase.auth().currentUser;
    firebase.database().ref('cart/' + user.uid + '/' + prod_id).remove();
    $(this).parent().parent().remove();
});