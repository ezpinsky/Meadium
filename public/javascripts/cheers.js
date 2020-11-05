// const { body } = require("express-validator")

window.addEventListener("load", (event) => {
    let ratingContainer = document.getElementById("rating-container")
    ratingContainer.addEventListener("click", async (e) => {
        console.log(e.target)
        let userId
        let storyId
        if (e.target.id.includes('|')) {
            const valueInfo = e.target.id.split("|")
            const rating = valueInfo[0]
            userId = valueInfo[1]
            storyId = valueInfo[2]
            const data = { rating: rating, userId: userId, storyId: storyId }
            await fetch(`http://localhost:8010/stories/${storyId}/cheers`, {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            const res = await fetch(`http://localhost:8010/stories/${storyId}/avgRating`)
            let avgRating = await res.json()
            let ratingEle = document.getElementById("rating")
            ratingEle.innerHTML = avgRating
            let i = e.target.id[0]
            for (let index = 5; index > 0; index--) {
                let ele = document.getElementById(`${index}|${userId}|${storyId}`)
                ele.classList.remove("checked")
            }
            for (let index = i; index > 0; index--) {
                let ele = document.getElementById(`${index}|${userId}|${storyId}`)
                ele.classList.add("checked")

            }
            console.log(i)
        }
        e.preventDefault()
    })
})
