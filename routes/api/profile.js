const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const User = require("../../models/User");
const Profile = require("../../models/Profile");

router.get("/all", (req, res) => {
  const errors = {};

  Profile.find()

    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "There are no profiles" }));
});

router.post(
  "/addStudent",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.studentId) profileFields.studentId = req.body.studentId;
    if (req.body.studentName) profileFields.studentName = req.body.studentName;
    if (req.body.email) profileFields.email = req.body.email;
    if (req.body.enrollementYear)
      profileFields.enrollementYear = req.body.enrollementYear;
    if (req.body.class) profileFields.class = req.body.class;
    if (req.body.city) profileFields.city = req.body.city;
    if (req.body.country) profileFields.country = req.body.country;

    Profile.findOne({ studentId: profileFields.studentId }).then(profile => {
      if (profile) {
        errors.studentId = "That studentId already exists";
        res.status(400).json(errors);
      }

      // Save Profile
      new Profile(profileFields).save().then(profile => res.json(profile));
    });
  }
);

router.post(
  "/aa",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newPost = new Profile({
      studentId: req.body.studentId,
      studentName: req.body.studentName,
      email: req.body.email,
      enrollementYear: req.body.enrollementYear,
      class: req.body.class,
      city: req.body.city,
      country: req.body.country,
      user: req.user.id
    });

    newPost.save().then(profile => res.json(profile));
  }
);

router.get("/profile/:id", (req, res) => {
  Profile.findById(req.params.id)
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
  console.log("fsldf", req.params.id);
});

router.put(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ profile: req.params.id }).then(profile => {
      const newExp = {
        studentId: req.body.studentId,
        studentName: req.body.studentName,
        email: req.body.location,
        enrollementYear: req.body.enrollementYear,
        class: req.body.class,
        city: req.body.city,
        country: req.body.country
      };
      newExp.save().then(profile => res.json(profile));
    });
  }
);

router.put(
  "/profile/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
      (err, profile) => {
        if (err) {
          return res.json({
            success: false,
            message: "Some Error",
            error: err
          });
        }
        console.log(profile);
        return res.json({
          success: true,
          message: "Updated successfully",
          profile
        });
      }
    );
  }
);

router.delete(
  "/profile/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findByIdAndRemove(req.params.id).then(() => {
      res.json({ success: true });
    });
  }
);

module.exports = router;
