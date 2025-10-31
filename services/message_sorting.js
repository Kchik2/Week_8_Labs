let {GoogleGenAI, Type} = require("@google/genai")

let departments = require("./departments")

let genAI = new GoogleGenAI({})

function selectDepartment(message){
    //Converting departments JSON into a string because LLM input is natural text, not json.
    let departmentString = JSON.stringify(departments)
    //Prompt that will be sent to the API request. I try to be very specific of what I want to try to avoid bad use.
    let prompt = `Return a list of the most likely departments to handle the following feedback message.
    Only include departments that seems to be a good fit for the message.
    If there does not seem to be a good fit. Return an empty list.
    message: ${ message }
    departments:${ departmentString } 
    `
    //Return promise over a generateContent request. It will return a json file with a specific schema.
    return genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.STRING
                }
            }
        }
    }).then(response => {
        //the response needs to be parse to JSON because outputs in llm is natural language.
        let departmentList = JSON.parse(response.text)
        console.log(departmentList)
        return departmentList
    })
}

module.exports = selectDepartment