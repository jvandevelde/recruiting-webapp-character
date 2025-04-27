import { CharacterAttributes, CharacterContext } from "../CharacterContext";
import { useContext, useMemo } from "react";
import { CLASS_LIST } from "../consts";

const CharacterClassList = () => {
  return (
    <>
      {Object.keys(CLASS_LIST).map((c) => (
        <CharacterClass className={c} requirements={CLASS_LIST[c]} />
      ))}
    </>
  );
};

const CharacterClass = (props: {
  className: string;
  requirements: { [key in keyof CharacterAttributes]: number };
}) => {
  const { characterAttributes } = useContext(CharacterContext);

  const handleInfoClick = () => {
    window.alert(
      `Requirements for '${props.className}' are\n${JSON.stringify(props.requirements, null, 2)}`,
    );
  };

  const meetsRequirements = useMemo(() => {
    let state = true;
    console.log(`Calculating Requirements for '${props.className}'`);
    for (const attr in characterAttributes) {
      console.log(
        `[${attr}]]:: ${characterAttributes[attr].value} <= ${props.requirements[attr]}`,
      );
      if (characterAttributes[attr].value < props.requirements[attr]) {
        state = false;
        break;
      }
    }
    return state;
  }, [characterAttributes]);

  return (
    <div>
      <span style={{ color: meetsRequirements ? "green" : "red" }}>
        <span style={{ marginRight: "10px" }}>
          {meetsRequirements ? `✅` : `❌`}
        </span>
        {props.className}
      </span>
      <span
        style={{ cursor: "pointer", marginLeft: "10px" }}
        onClick={handleInfoClick}
      >
        🛈
      </span>
    </div>
  );
};

export default CharacterClassList;
