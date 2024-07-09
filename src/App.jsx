import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { RxCross2 } from "react-icons/rx";
import { HTML5Backend } from "react-dnd-html5-backend";
import { IoIosArrowDown } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
import { TiTick } from "react-icons/ti";

// wonderful drag and drop has been implemented
// problem with the search, it seems it doesn't work correctly
// From all the inputs, I should be able to see suggestions on typing
// If a skill hasn't been added the input should be disabled !
// input should be displayed just after the last added skill
// other disabled inputs below

// lets deal with the inputs display if there are no items
// i'm thinking, I should  ensure if there is no skill item, inputs should be added
// I want if there is not list, the inputs are displayed as disabled unless for the
// first add input for add item
// lets say i have skills = [] filled with null
//
const SkillItem = ({ skill, index, moveSkill, removeSkill }) => {
  const [, ref] = useDrag({
    type: "SKILL",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "SKILL",
    hover: (item) => {
      if (item.index !== index) {
        moveSkill(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => ref(drop(node))}
      className="flex justify-between bg-blue-900 text-white p-2 text-lg border-[1px] w-full rounded-md mb-2 items-center"
    >
      <input
        value={`${index+1}. ${skill}`}
        disabled
        className="w-full ml-1.5 disabled:bg-blue-900"
      />

      <RxCross2 onClick={() => removeSkill(index)} className="text-base" />
    </div>
  );
};

const SkillList = ({ skills, moveSkill, removeSkill }) => {
  return (
    <>
      {skills.map((skill, index) => (
        <SkillItem
          key={index}
          index={index}
          skill={skill}
          moveSkill={moveSkill}
          removeSkill={removeSkill}
        />
      ))}
    </>
  );
};

const SearchInput = ({ addSkill, disabled }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [rotate, setRotate] = useState(false);

  // useEffect(() => {
  //   // Replace with your API call or hard-coded data
  //   setSuggestions(["JavaScript", "React", "CSS", "HTML", "Node.js"]);
  // }, []);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    // Filter suggestions based on input
    // Simulate API call
    setSuggestions(
      ["JavaScript", "React", "CSS", "HTML", "Node.js"].filter((skill) =>
        skill.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleSelect = (skill) => {
    addSkill(skill);
    setInputValue("");
    setSuggestions([]);
  };
  const handleArrowDownClick = () => {
    if (!suggestions.length > 0) {
      setSuggestions(["JavaScript", "React", "CSS", "HTML", "Node.js"]);
    } else {
      setSuggestions([]);
    }
    setRotate(!rotate);
  };
  return (
    <div className="mb-2 relative">
      <div
        className={`flex justify-between items-center text-lg rounded-md border-[1px] p-2 ${
          disabled ? "bg-gray-300" : "bg-slate-100"
        }`}
      >
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          disabled={disabled}
          placeholder="Add a skill..."
          className={`${
            !disabled ? "placeholder:text-gray-500" : "text-slate-300"
          }  w-full disabled:bg-gray-300 bg-slate-100 focus-visible:outline-none `}
        />
        {!disabled && (
          <IoIosArrowDown
            className={`cursor-pointer text-gray-800 transition-transform duration-75 ease-in ${
              rotate ? " rotate-180" : ""
            }`}
            onClick={() => handleArrowDownClick()}
          />
        )}
      </div>
      <div
        className={`${
          suggestions.length > 0 ? "block" : "hidden"
        } absolute top-10 w-full z-10 border-[1px] bg-slate-100 rounded-md my-2 py-2 max-h-32 overflow-y-scroll`}
      >
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            onClick={() => handleSelect(suggestion)}
            className="hover:bg-slate-300 cursor-grab p-2"
          >
            {suggestion}
          </div>
        ))}
      </div>
    </div>
  );
};

const SuggestedSkills = ({ addSkill, suggestions, suggestionSelected }) => {
  return (
    <div className="min-w-[20%]">
      <h4 className="text-blue-900 font-semibold text-lg text-center mb-2">
        Suggested Skills
      </h4>
      {suggestions.map((skill, index) => (
        <div
          key={index}
          onClick={() => addSkill(skill)}
          className="text-lg text-gray-500 transition-transform duration-700"
        >
          <div className="flex gap-2 items-center mb-1 cursor-pointer">
            {suggestionSelected[index] ? (
              <TiTick className="text-[15px] text-green-500" />
            ) : (
              <FiPlus className="text-base" />
            )}

            <p>{skill}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const disabledArr = Array(5).fill(true);
  disabledArr[0] = false;
  const [disabled, setDisabled] = useState(disabledArr);

  const [skills, setSkills] = useState([]);

  const [suggestions, setSuggestions] = useState([]);
  const [suggestionSelected, setSuggestionSelected] = useState([]);

  useEffect(() => {
    // Replace with your API call or hard-coded data
    let suggestionsArr = ["JavaScript", "React", "CSS", "HTML", "Node.js"];
    setSuggestions(suggestionsArr);

    setSuggestionSelected(Array(suggestionsArr.length).fill(false));
  }, []);

  const addSkill = (skill) => {
    if (skills.length < 5 && !skills.includes(skill)) {
      let newSkills = [...skills, skill];
      setSkills(newSkills);
      let newDisabled = Array(5 - newSkills.length).fill(true);
      newDisabled[0] = false;
      setDisabled(newDisabled);
      let newSuggestionSelected = suggestionSelected;
      let suggestionIndex = suggestions.indexOf(skill);
      newSuggestionSelected[suggestionIndex] = true;
      setSuggestionSelected(newSuggestionSelected);
    }
  };

  const removeSkill = (index) => {
    let newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
    let newDisabled = Array(5 - newSkills.length).fill(true);
    newDisabled[0] = false;
    setDisabled(newDisabled);
    let newSuggestionSelected = suggestionSelected;
    let suggestionIndex = suggestions.indexOf(skills[index]);
    newSuggestionSelected[suggestionIndex] = false;
    setSuggestionSelected(newSuggestionSelected);
  };

  const moveSkill = (from, to) => {
    const updatedSkills = [...skills];
    const [movedSkill] = updatedSkills.splice(from, 1);
    updatedSkills.splice(to, 0, movedSkill);
    setSkills(updatedSkills);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen bg-slate-300 flex items-center justify-center">
        <div className="flex flex-col sm:flex-row bg-white rounded-md min-w-[50%] sm:gap-16 p-14 sm:pr-4 lg:pr-2 lg:gap-20">
          <div className="min-w-[54%]">
            <SkillList
              skills={skills}
              moveSkill={moveSkill}
              removeSkill={removeSkill}
            />

            {skills.length < 5 &&
              disabled.map((disableVal, index) => {
                return (
                  <SearchInput addSkill={addSkill} disabled={disableVal} />
                );
              })}
          </div>
          <SuggestedSkills
            addSkill={addSkill}
            suggestions={suggestions}
            suggestionSelected={suggestionSelected}
          />
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
