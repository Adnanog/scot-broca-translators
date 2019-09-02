const express = require("express");
const router = express.Router();
const passport = require("passport");
const docsDb = require("../services/database/documents");
const { INTERPRETER } = require("../auth/roles");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id, role } = req.user;

    let getDocumentFunction;
    if (role === INTERPRETER) {
      getDocumentFunction = docsDb.getAllDocuments;
    } else {
      getDocumentFunction = docsDb.getUserDocuments;
    }

    getDocumentFunction(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(500);
      });
  }
);

module.exports = router;
