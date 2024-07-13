# Tech Skill Form Component
Building this component arose as a challenge by [FrontEnd Pro](https://www.frontendpro.dev/frontend-coding-challenges/sortable-list-component-yfG6JlItkHMpWze4wacs).
Here are the challenge requirements

## Challenge Requierments
- ## The component should display a list of up to 5 selected skills in a column.
  ### solution
   - create a useState hook to handle list in an array
   - create an addSkill function, which after selecting a skill,
     update the skills array with the added skill
   - create a list skills component to display lists



## If the list doesn't have all 5 selected skills, the component should display an input box just after the last selected skill in the list.
### solution
- create a useState hook to hold a disabled boolean array i.e the state of the search Input. It should be of length by 5 by default with the first element always as false since skills array would be empty at the beginning.
- create an SearchInput component that would inputs a skill
- if a skill is added, create a new diabled array of length 5- the length of skills Array
- render skills first then conditionally render SearchInput on the skills is of length less than 5.



## The input box should display suggestions as the user types from an API or hard-coded data.
# solution
- create a useState hook to store suggestions
- create a useEffect hook with a dependency array to update suggestion with hard-coded example skills
- create a function handleChange to update suggestions using its useState update function. Below the input display updated suggestion with a map function


## After selecting a skill from the suggestions, the selected skill should be added to the list of selected skills.

### solution
- pass add skill function to the suggested skills component a call it one a suggestion is clicked

## The component should allow the user to delete a selected skill by clicking on a delete button.

### solution
- on the div that skills input, add an x icon and on its onClick call delete function passing the name of the skill as the parameter
- create a delete function that would filter the suggested array not to contain the array to be deleted.

## The component should allow the user to rearrange the selected skills by drag and drop.

### solution
- read this article on how to implement it [drag and drop React](https://www.geeksforgeeks.org/implement-drag-and-drop-using-react-component/)


## The component should also display a column of suggested skills next to the list. The user should be able to select a skill from the suggested skills column and add it directly to the list by clicking on the skill.

### solution
- Pass add skill function to hardcorded suggested skills

### Other requirements
- Show the hover state of all the elements.
- The component should be responsive and display correctly on different screen sizes.
- Make this landing page look as close to the design as possible.
