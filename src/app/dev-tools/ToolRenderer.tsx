"use client";

import { useMemo } from "react";
import { tools } from "./toolsData";

// Individual tool components
import JSONFormatter from "./tools/JSONFormatter";
import UUIDGenerator from "./tools/UUIDGenerator";
import TokenGenerator from "./tools/TokenGenerator";
import HashTextTool from "./tools/HashTextTool";
import BcryptTool from "./tools/BcryptTool";
import UrlEncoderDecoder from "./tools/UrlEncoderDecoder";
import HashGenerator from "./tools/HashGenerator";
import ColorConverter from "./tools/ColorConverter";
import RegexTester from "./tools/RegexTester";
import EncryptDecrypt from "./tools/EncryptDecrypt";
import BIP39Generator from "./tools/BIP39Generator";
import HmacGenerator from "./tools/HmacGenerator";
import RSAKeyGenerator from "./tools/RSAKeyGenerator";
import PasswordStrength from "./tools/PasswordStrength";
import DateTimeConverter from "./tools/DateTimeConverter";
import IntegerBaseConverter from "./tools/IntegerBaseConverter";
import RomanNumeralConverter from "./tools/RomanNumeralConverter";
import Base64StringTool from "./tools/Base64StringTool";
import CaseConverter from "./tools/CaseConverter";
import TextToNato from "./tools/TextToNato";
import TextToAsciiBinary from "./tools/TextToAsciiBinary";

export default function ToolRenderer({ toolId }: { toolId: string }) {
  const tool = useMemo(() => tools.find((t) => t.id === toolId), [toolId]);
  if (!tool) return null;

  const render = () => {
    switch (toolId) {
      case "json-formatter":
        return <JSONFormatter />;
      case "uuid-generator":
        return <UUIDGenerator />;
      case "token-generator":
        return <TokenGenerator />;
      case "hash-text":
        return <HashTextTool />;
      case "bcrypt":
        return <BcryptTool />;
      case "url-encoder":
        return <UrlEncoderDecoder />;
      case "hash-generator":
        return <HashGenerator />;
      case "hmac-generator":
        return <HmacGenerator />;
      case "rsa-keypair":
        return <RSAKeyGenerator />;
      case "password-strength":
        return <PasswordStrength />;
      case "date-time-converter":
        return <DateTimeConverter />;
      case "color-converter":
        return <ColorConverter />;
      case "regex-tester":
        return <RegexTester />;
      case "encrypt-decrypt":
        return <EncryptDecrypt />;
      case "bip39-generator":
        return <BIP39Generator />;
      case "roman-numeral-converter":
        return <RomanNumeralConverter />;
      case "integer-base-converter":
        return <IntegerBaseConverter />;
      case "base64-string":
        return <Base64StringTool />;
      case "case-converter":
        return <CaseConverter />;
      case "text-to-nato":
        return <TextToNato />;
      case "text-to-ascii-binary":
        return <TextToAsciiBinary />;
      default:
        return null;
    }
  };

  return render();
}


