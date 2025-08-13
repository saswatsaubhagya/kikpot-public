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
import TextToUnicode from "./tools/TextToUnicode";
import YamlToJson from "./tools/YamlToJson";
import YamlToToml from "./tools/YamlToToml";
import JsonToYaml from "./tools/JsonToYaml";
import JsonToToml from "./tools/JsonToToml";
import TomlToJson from "./tools/TomlToJson";
import TomlToYaml from "./tools/TomlToYaml";
import ListConverter from "./tools/ListConverter";
import XmlToJson from "./tools/XmlToJson";
import JsonToXml from "./tools/JsonToXml";
import MarkdownToHtml from "./tools/MarkdownToHtml";
import UrlParser from "./tools/UrlParser";
import BasicAuthGenerator from "./tools/BasicAuthGenerator";
import OpenGraphMetaGenerator from "./tools/OpenGraphMetaGenerator";
import OTPCodeGenerator from "./tools/OTPCodeGenerator";
import JwtParser from "./tools/JwtParser";
import KeycodeInfo from "./tools/KeycodeInfo";
import SlugifyString from "./tools/SlugifyString";
import HtmlWysiwygEditor from "./tools/HtmlWysiwygEditor";
import JsonDiff from "./tools/JsonDiff";
import QrCodeGenerator from "./tools/QrCodeGenerator";
import WifiQrCodeGenerator from "./tools/WifiQrCodeGenerator";
import SvgPlaceholderGenerator from "./tools/SvgPlaceholderGenerator";
import MathEvaluator from "./tools/MathEvaluator";
import PercentageCalculator from "./tools/PercentageCalculator";
import TemperatureConverter from "./tools/TemperatureConverter";
import LoremIpsumGenerator from "./tools/LoremIpsumGenerator";
import TextStatistics from "./tools/TextStatistics";

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
      case "text-to-unicode":
        return <TextToUnicode />;
      case "yaml-to-json":
        return <YamlToJson />;
      case "yaml-to-toml":
        return <YamlToToml />;
      case "json-to-yaml":
        return <JsonToYaml />;
      case "json-to-toml":
        return <JsonToToml />;
      case "toml-to-json":
        return <TomlToJson />;
      case "toml-to-yaml":
        return <TomlToYaml />;
      case "list-converter":
        return <ListConverter />;
      case "xml-to-json":
        return <XmlToJson />;
      case "json-to-xml":
        return <JsonToXml />;
      case "markdown-to-html":
        return <MarkdownToHtml />;
      case "url-parser":
        return <UrlParser />;
      case "basic-auth-generator":
        return <BasicAuthGenerator />;
      case "open-graph-meta-generator":
        return <OpenGraphMetaGenerator />;
      case "otp-generator":
        return <OTPCodeGenerator />;
      case "jwt-parser":
        return <JwtParser />;
      case "keycode-info":
        return <KeycodeInfo />;
      case "slugify-string":
        return <SlugifyString />;
      case "html-wysiwyg-editor":
        return <HtmlWysiwygEditor />;
      case "json-diff":
        return <JsonDiff />;
      case "qr-code-generator":
        return <QrCodeGenerator />;
      case "wifi-qr-code-generator":
        return <WifiQrCodeGenerator />;
      case "svg-placeholder-generator":
        return <SvgPlaceholderGenerator />;
      case "math-evaluator":
        return <MathEvaluator />;
      case "percentage-calculator":
        return <PercentageCalculator />;
      case "temperature-converter":
        return <TemperatureConverter />;
      case "lorem-ipsum-generator":
        return <LoremIpsumGenerator />;
      case "text-statistics":
        return <TextStatistics />;
      default:
        return null;
    }
  };

  return render();
}


