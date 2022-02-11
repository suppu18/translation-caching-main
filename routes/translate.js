const express = require("express");
const cache = require("../routeCache");
const router = express.Router();
const googleTranslate = require("@vitalets/google-translate-api");
console.log("router running");

router.get("/translate", cashe(10), async (req, res) => {
  let queryParameter = req.query;
  console.log(queryParameter);
  let output = {};
  try {
    googleTranslate(queryParameter.sourceText, {
      to: queryParameter.targetLanguage,
    })
      .then((res) => {
        console.log(res.text);
        output.translatedText = res.text;
        console.log(res.from.language.iso);
        output.fromLanguage = res.from.language.iso;
        res.status(200).json({
          success: true,
          data: output,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (error) {
    console.log(error);
  }
});

router.get("/test1", async (req, res) => {
  let output = {};
  try {
    const response = await googleTranslate("How u doing?", { to: "ja" });

    output.translatedText = response.text;
    output.fromLanguage = response.from.language.iso;
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({
    success: true,
    data: output,
  });
});

router.get("/test2", async (req, res) => {
  let queryParameter = req.query;

  let output = {};
  try {
    const response = await googleTranslate(queryParameter.sourceText, {
      to: queryParameter.targetLanguage,
    });

    output.translatedText = response.text;
    output.fromLanguage = response.from.language.iso;
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({
    success: true,
    data: output,
  });
});

module.exports = router;
