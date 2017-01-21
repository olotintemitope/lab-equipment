;(($) =>  {
  $.fn.UpdateUserInfo = () => {
    return $(this).each(() => {
      let user = new User;
      user.updateProfile();
      user.editUserAccount();
      user.updateUserAccount();
      user.getLabUsers();
    });
  }

  class User {
    getLabUsers() {
      let user = User;
      let select = $('form#edit-user-account #lab');
      select.on('change', function() {
        let _this = $(this);
        let labId = _this.val();

        if (lab > 0) {
          let route = '/labs/'+labId+'/users';
          user.makeAjaxCall(route, '', 'GET')
            .done(function(data) {
              console.log(data);
            })
            .fail(function(error) {
              console.log(error);
            }) 
        }

        return false;
      });
    }

    updateUserAccount() {
      let user = new User;
      let submitBtn = $('button.ok');
      submitBtn.on('click', function() {
        let form = $(document).find('div#manage-user-account div.modal-body > form.user-account');
        let modal = $(document).find('div#manage-user-account');
        let id = form.attr('id');
        let formObject = form.find('input, select');
        user.makeAjaxCall('/users/'+id+'/update', formObject, 'POST')
          .done(function(data) {
            toastr.success(data.message);
            modal.modal('hide');
          })
          .fail(function(error) {
            toastr.error(error.toString());
          })
         return false;
      });
    }

    editUserAccount() {
      let user = new User;
      let editLink = $('a.student-edit');
      editLink.on('click', function() {
        let modalWrapper = $('.manage-user-account');
        let modalBody = modalWrapper.find('div.modal-body');
        let _this = $(this);
        let userId = _this.attr('id');
        user.makeAjaxRequest('/users/'+userId+'/edit', '', 'GET')
          .done(function(data) {
            modalBody.html(data);
            modalWrapper.modal('show');
          })
          .fail(function(error) {
            console.log(error)
          })
        return false;
      });
    }

    updateProfile() {
      let user = new User;
      let saveBtn = $('#save-bio');
      saveBtn.on('click', function() {
        let name = $('form#update_user_bio').find('#name').val();
        let email = $('form#update_user_bio').find('#email').val();
        let phone = $('form#update_user_bio').find('#phone').val();
        let office = $('form#update_user_bio').find('#office').val();
        let oldPassword = $('form#update_user_bio').find('#c_password').val();
        let newPassword = $('form#update_user_bio').find('#new_password').val();
        let confirmPassword = $('form#update_user_bio').find('#com_password').val();

        if (newPassword != confirmPassword) {
          return toastr.error('Both passwords does not match!');
        }
        // make a put request to the server side
        let params = {
          'name': name,
          'email': email,
          'phone': phone,
          'office': office,
          'c_password': oldPassword,
          'new_password': newPassword
        }
        user.makeAjaxCall('/users/'+email, params, 'PUT')
          .done(function(data) {
            toastr.success(data.message);
            return false
          })
          .fail(function(error) {
            toastr.error(error.toString());
          });
        return false;
      });
    }

    makeAjaxCall(url, params, method) {
      return $.ajax({
        headers:{
        'X-CSRF-Token': $('input[name="_token"]').val()
      },
        url: url,
        type: method,
        dataType: 'json',
        data: params,
      });
    }

     makeAjaxRequest(url, params, method) {
      return $.ajax({
        headers:{
        'X-CSRF-Token': $('input[name="_token"]').val()
      },
        url: url,
        type: method,
        //dataType: 'json',
        data: params,
      });
    }
  }
  })(jQuery);

  $('body').UpdateUserInfo();