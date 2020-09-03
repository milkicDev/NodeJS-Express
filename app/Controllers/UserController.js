const User = require('../Models/User');

class UserController {
  constructor() {}

  index(req, res) {
    User.find().exec((error, users) => {
      if (error) {
        return console.error('Error: ', error);
      }

      return res.render('../views/users/index', {
        users: users,
        message: req.flash('message'),
        errors: req.flash('errors'),
        site: {
          title: 'Users'
        },
      });
    });
  }

  create(req, res) {
    return res.render('../views/users/create', {
      message: req.flash('message'),
      errors: req.flash('errors'),
      site: {
        title: 'Add User',
      }
    });
  }

  store(req, res) {
    const user = new User(req.body);

    user.save((error, user) => {
      if (error) {
        // console.error('Error: ', error);

        var errors = [];
        let i = 0;
        for (let field in error.errors) {
          errors[i] = {
            path: field,
            message: error.errors[field].message
          };
          i++;
        }

        req.flash('message', 'Enter data correctly!');
        req.flash('errors', errors)
        return res.redirect('/users/create');
      }

      return res.redirect('/users/' + user._id);
    });
  }

  show(req, res) {
    User.findById(req.params.id)
      .exec((error, user) => {
        return res.render('../views/users/show', {
          user: user,
          message: req.flash('message'),
          errors: req.flash('errors'),
          site: {
            title: user.username || 'User',
          }
        });
      });
  }

  edit(req, res) {
    User.findById(req.params.id)
      .exec((error, user) => {
        return res.render('../views/users/edit', {
          user: user,
          message: req.flash('message'),
          errors: req.flash('errors'),
          site: {
            title: `Edit ${user.username || 'User'}`
          }
        });
      });
  }

  update(req, res) {
    User.findByIdAndUpdate(req.params.id, {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email
        }
      }, {
        new: true,
        runValidators: true
      })
      .exec((error, user) => {
        if (error) {
          // console.error('Error: ', error);

          var errors = [];
          let i = 0;
          for (let field in error.errors) {
            errors[i] = {
              path: field,
              message: error.errors[field].message
            };
            i++;
          }

          req.flash('message', 'Enter data correctly!');
          req.flash('errors', errors)
          return res.redirect('/users/edit/' + req.params.id);
        }

        req.flash('message', 'User has updated!');
        return res.redirect('/users/' + user._id);
      });
  }

  destroy(req, res) {
    User.findByIdAndDelete(req.params.id)
      .exec((error, user) => {
        if (error) {
          var errors = [];
          let i = 0;
          for (let field in error.errors) {
            errors[i] = {
              path: field,
              message: error.errors[field].message
            };
            i++;
          }

          req.flash('message', 'User <strong>${user.username}</strong> can\'t be deleted!');
          req.flash('errors', errors)
          return res.redirect('/users/edit/' + req.params.id);
        }

        req.flash('message', `User <strong>${user.username}</strong> has deleted!`);
        return res.redirect('/users');
      });
  }
}

module.exports = new UserController();