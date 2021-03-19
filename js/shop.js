jQuery(document).ready(function ($) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            showAllProd();
        }
        else {
            alert("To see our production sign in first")
        }
    });
});

function showAllProd() {
    firebase.database().ref().child("products").get().then(function (snapshot) {
        if (snapshot.exists()) {
            for (const key in snapshot.val()) {
                if (Object.hasOwnProperty.call(snapshot.val(), key)) {
                    const element = snapshot.val()[key];
                    var img = (element.img != null && element.img != '') ? element.img : "https://via.placeholder.com/350x280";
                    var html = '<div class="product tumbnail thumbnail-3">' +
                        '<a href="#">' +
                        '<img src="' + img + '" alt="">' +
                        '</a>' +
                        '<div class="caption">' +
                        '<div class="d-flex">' +
                        '<div>' +
                        '<h6><a href="#" class="prod_name">' + element.name + '</a></h6>' +
                        '$<span class="price">' + element.price + '</span>' +
                        '<input type="hidden" class="inputid" value="' + key + '"/>' +
                        '</div>' +
                        '<div class="form-group ml-auto">' +
                        '<input type="number" class="form-control" id="exampleInputEmail1"' +
                        'aria-describedby="number" placeholder="Amount" value="1" min="1">' +
                        '</div>' +
                        '<button class="btn btn-outline-dark add ml-2"><i class="fas fa-plus"></i></button>' +
                        '</div>' +
                        '<div class="prod_desc">' + element.desc + '</div>' +
                        '</div>' +
                        '</div>';

                    $('#content').append(html);
                }
            }
        }
        else {
            console.log("No data available");
        }
    }).catch(function (error) {
        console.error(error);
    });
}

$('#content').on('click', '.add', function (event) {
    var prod_id = $(this).parent().children('div').children('.inputid').val();
    var amount = $(this).parent().children('.form-group').children('input').val();
    var user = firebase.auth().currentUser;
    firebase.database().ref('cart/' + user.uid + '/' + prod_id).update({
        'amount': parseInt(amount)
    }).then(function () {
        $('.toast').toast('show');
    });
});

$("#search_product").on("change paste keyup", function () {
    $('.product').remove();
    const dbRef = firebase.database().ref("products");
    dbRef.orderByChild("name").startAt($(this).val())
        .endAt($(this).val() + "\uf8ff").on("value", snapshot => {
            console.log(snapshot.val());

            if (snapshot.exists()) {
                for (const key in snapshot.val()) {
                    if (Object.hasOwnProperty.call(snapshot.val(), key)) {
                        const element = snapshot.val()[key];
                        var img = (element.img != null && element.img != '') ? element.img : "https://via.placeholder.com/350x280";
                        var html = '<div class="product tumbnail thumbnail-3">' +
                            '<a href="#">' +
                            '<img src="' + img + '" alt="">' +
                            '</a>' +
                            '<div class="caption">' +
                            '<div class="d-flex">' +
                            '<div>' +
                            '<h6><a href="#" class="prod_name">' + element.name + '</a></h6>' +
                            '$<span class="price">' + element.price + '</span>' +
                            '<input type="hidden" class="inputid" value="' + key + '"/>' +
                            '</div>' +
                            '<div class="form-group ml-auto">' +
                            '<input type="number" class="form-control" id="exampleInputEmail1"' +
                            'aria-describedby="number" placeholder="Amount" value="1" min="1">' +
                            '</div>' +
                            '<button class="btn btn-outline-dark add ml-2"><i class="fas fa-plus"></i></button>' +
                            '</div>' +
                            '<div class="prod_desc">' + element.desc + '</div>' +
                            '</div>' +
                            '</div>';

                        $('#content').append(html);
                    }
                }
            }
            else {
                console.log("No data available");
            }
        });
});

function userCheck() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            return true;
        }
        else {
            return false;
        }
    });
}