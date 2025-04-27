import { CharacterAttributes, CharacterContext } from "../CharacterContext";
import { useContext } from "react";
import { ATTRIBUTE_LIST } from "../consts";

const AttributeList = () => {
  return (
    <>
      {ATTRIBUTE_LIST.map((a: unknown) => (
        <CharacterAttribute name={a as keyof CharacterAttributes} />
      ))}
    </>
  );
};

const CharacterAttribute = (props: { name: keyof CharacterAttributes }) => {
  const { characterAttributes, incrementAttribute, decrementAttribute } =
    useContext(CharacterContext);

  const handleIncrease = () => {
    incrementAttribute(props.name);
  };

  const handleDecrease = () => {
    decrementAttribute(props.name);
  };

  return (
    <div>
      <p>
        {props.name}: {characterAttributes[props.name].value} (Modifier:{" "}
        {characterAttributes[props.name].modifier})
      </p>
      <span style={{ marginLeft: "10px" }}>
        <button onClick={handleDecrease}>-</button>
        <button onClick={handleIncrease}>+</button>
      </span>
    </div>
  );
};

export default AttributeList;
