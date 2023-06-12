import CreateIcon from "@mui/icons-material/CreateOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import {
  ClickAwayListener,
  Paper,
  PopperProps,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Quiz from "@/components/Reader/Quiz";
import SelectionPopover from "@/components/Reader/SelectionPopover";
import {
  DETECT_LANGUAGE,
  supportedLanguages,
} from "@/api-utils/data/supportedLanguages";
import type { NextPage } from "next";
import { useSearchParams } from "next/navigation";
import { DetectLanguageResponse } from "./api/detect-language";
import { TranslationLanguageResponse } from "./api/translate";

const Reader: NextPage = () => {
  const [translation, setTranslation] = useState("");
  const [anchorEl, setAnchorEl] = useState<PopperProps["anchorEl"]>(null);
  const [shouldDisplayPopover, setShouldDisplayPopover] = useState(false);

  const searchParams = useSearchParams();

  const [inputLanguage, setInputLanguage] = useState(supportedLanguages[0]);
  const [outputLanguage, setOutputLanguage] = useState(supportedLanguages[1]);
  const [text, setText] = useState("");

  const [triedToDetectLang, setTriedToDetectLang] = useState(false);

  useEffect(() => {
    // On client first render, initialize everything
    const setInitialTextAndLanguages = () => {
      setInputLanguage(
        searchParams.get("inputLanguage") ||
          localStorage.getItem("inputLanguage") ||
          supportedLanguages[0]
      );

      setOutputLanguage(
        searchParams.get("outputLanguage") ||
          localStorage.getItem("outputLanguage") ||
          supportedLanguages[1]
      );

      setText(localStorage.getItem("text") || "hello");
    };

    setInitialTextAndLanguages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // If input language is on 'detect', then let's detect it and set it
    const callDetectLanguage = async () => {
      const res = await fetch("/api/detect-language", {
        method: "POST",
        body: JSON.stringify({ text: text }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = (await res.json()) as DetectLanguageResponse;
      setInputLanguage(data.language);
      localStorage.setItem("inputLanguage", data.language);
    };

    if (!triedToDetectLang && text && inputLanguage === DETECT_LANGUAGE) {
      setTriedToDetectLang(true);
      callDetectLanguage();
    }
  }, [text, inputLanguage, triedToDetectLang]);

  const hideTranslation = () => {
    setShouldDisplayPopover(false);
  };

  function delay(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  const updateTranslation = async () => {
    await delay(200);
    // Sometimes highlight is still changing.
    // This is a bit of a magic number, but it is hard to predict if it is about to change. I am not sure a better way to do this

    const selection = window.getSelection();
    if (
      !selection ||
      selection.anchorOffset === selection.focusOffset || // Empty
      !selection.toString().trim() || // Blank text
      selection.rangeCount === 0
    ) {
      return;
    }

    let range: Range;
    try {
      // Avoid strange bug where range changes later
      range = selection.getRangeAt(0);
    } catch (e) {
      return;
    }

    const getBoundingClientRect = () => {
      let position = range.getBoundingClientRect();
      if (!range.startContainer.textContent) {
        return position;
      }
      const char_before =
        range.startContainer.textContent[range.startOffset - 1];
      if (char_before === "\n") {
        // This hunts down a Safari bug where the rect is wrong in case of after newlines
        // create a clone of our Range so we don't mess with the visible one
        const clone = range.cloneRange();
        // check if we are experiencing a bug
        clone.setStart(range.startContainer, range.startOffset - 1);
        if (clone.getBoundingClientRect().top === position.top) {
          // make it select the next character
          clone.setStart(range.startContainer, range.startOffset + 1);
          position = clone.getBoundingClientRect();
        }
      }

      return position;
    };

    setAnchorEl({ getBoundingClientRect });

    const res = await fetch("/api/translate", {
      method: "POST",
      body: JSON.stringify({
        inputLanguage: inputLanguage,
        outputLanguage: outputLanguage,
        text: selection.toString().trim(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = (await res.json()) as TranslationLanguageResponse;
    // TODO: Add a res.ok check and display an error message if we can't translate
    setTranslation(data.translation);
    setShouldDisplayPopover(true);
  };

  return (
    <Stack direction="column" spacing={3}>
      <Stack direction="column" spacing={1.5}>
        <Stack alignItems="center" direction="row" spacing={2}>
          <CreateIcon />
          <Typography
            variant="h6"
            className="disable-text-selection"
            fontFamily={"courier, monospace"}
            lineHeight={1.1}
          >
            Highlight any words or sentences for a translation
          </Typography>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={2}>
          <QuizOutlinedIcon />
          <Typography
            variant="h6"
            className="disable-text-selection"
            fontFamily={"courier, monospace"}
            lineHeight={1.1}
          >
            Take a quiz on this text at the end
          </Typography>
        </Stack>
      </Stack>
      <ClickAwayListener onClickAway={hideTranslation}>
        <Paper
          elevation={2}
          sx={{ py: 2, px: 3, minHeight: "50vh" }}
          onMouseUp={updateTranslation}
          onMouseDown={hideTranslation}
        >
          <Typography
            variant="subtitle1"
            style={{ whiteSpace: "pre-wrap", display: "inline-block" }}
          >
            {text}
          </Typography>
          <SelectionPopover
            content={translation}
            anchorEl={anchorEl}
            display={shouldDisplayPopover}
          />
        </Paper>
      </ClickAwayListener>

      <Quiz
        text={text}
        inputLanguage={inputLanguage}
        outputLanguage={outputLanguage}
      />
    </Stack>
  );
};

export default Reader;
