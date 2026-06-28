const flowchart = document.getElementById("flowchart");
let dataArr = [];
let todayName = new Date()
  .toLocaleString("en-US", { weekday: "short" })
  .toLowerCase();

function createFlowchart(dataArr) {
  let max = Math.max(...dataArr.map((e) => e.amount));
  dataArr.forEach((ele) => {
    let amountPercentage = Math.trunc((ele.amount / max) * 100);
    let height = (amountPercentage / 100) * 140;
    let dayFlow = document.createElement("div");
    dayFlow.className = "flex flex-col gap-3 justify-end items-center text-sm";
    dayFlow.innerHTML = `
      <span 
      class="group w-8 sm:w-10 relative rounded-sm ${ele.day === todayName ? "bg-Blue-300" : "bg-Red-500"} hover:opacity-80 transition cursor-pointer" 
      style="height: ${Math.trunc(height)}px"> 
      <span class="w-10 sm:w-12 p-1 rounded-md hidden absolute z-10 -left-1 -top-6.25 sm:-top-7 text-white text-[10px] text-center sm:text-xs bg-Brown-950 transition group-hover:block">
      $${ele.amount}
      </span>
      </span>
      <span>${ele.day}</span>
      `;
    flowchart.append(dayFlow);
  });
}

async function returnData() {
  try {
    let data = await fetch("./data.json");
    dataArr = await data.json();
    console.log(dataArr);
  } catch (error) {
    console.error("No Data Found");
  }
  createFlowchart(dataArr);
}

returnData();

/*
// *Note* :
//   1- I used the style tag to set height because h- doesn't work ask Gemini about that 
//      it try the two method h-[${amountPercentage}%] and the h-[${height}px] and 
//      i put a height to the father 
//   2- i try to make the amountSpan with pseudo ele but the content-['$${ele.amount}'] 
//      class doesn't work
*/
