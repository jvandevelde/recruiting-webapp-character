import AttributeList from "./CharacterAttribute";
import CharacterClassList from "./CharacterClass";
import SkillList from "./CharacterSkill";
import { CharacterContextProvider } from "../CharacterContext";

const Character = (props: { name: string }) => {
  return (
    <CharacterContextProvider>
      <div
        style={{ fontSize: "28px", fontWeight: "bolder", marginTop: "10px" }}
      >
        {props.name}
      </div>
      <div style={{ display: "flex", flexDirection: "row", padding: "20px" }}>
        <section className="App-section">
          <AttributeList />
        </section>
        <section className="App-section">
          <CharacterClassList />
        </section>
        <section className="App-section">
          <SkillList />
        </section>
      </div>
    </CharacterContextProvider>
  );
};

export default Character;
