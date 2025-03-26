import { ITextFormat } from "../../../types";

interface IHighlightTextProps {
  textFormats: ITextFormat[];
}

function HighlightText({ textFormats }: IHighlightTextProps) {
  return (
    <>
      {textFormats?.map((textFormat, index) => (
        <span
          key={index}
          style={{
            fontWeight: textFormat.type === "highlight" ? "bold" : "normal",
          }}
        >
          {textFormat.text}
        </span>
      ))}
    </>
  );
}

export default HighlightText;
