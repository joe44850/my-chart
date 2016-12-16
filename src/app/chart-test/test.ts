// initD3Test(d:Array<any>){
//     var data = d3.shuffle(d);
//     let element = this.chartContainer.nativeElement;

//     let width = 1000;
//     let height = 500;
//     let widthScale = d3.scaleLinear()
//       .domain([0,100])
//       .range([0, width]);
//     let colorScale = d3.scaleLinear()
//       .domain([70, 100])
//       .range(<any[]>["red", "blue"]);

//     var xAxis = d3.axisBottom(widthScale).ticks(20);

//     var canvas = d3.select(element)
//       .append("svg")
//       .attr("width", width)
//       .attr("height", 600)
//       .append("g")
//       .attr("transform", "translate(10, 10)");           

//     var bars = canvas.selectAll("rect")
//       .data(data)
//       .enter()
//         .append("rect")
//         .attr("width", function(d){
//           return widthScale(d.score1);;
//         })
//         .attr("height", 48)
//         .attr("y", function(da, index){
//           return (index * 50);
//         })
//         .attr("fill", function(d, i){
//           return colorScale(d.score1);
//         });

// /*
//     bars.transition()    
//           .attr('width', function(d){
//             return widthScale(width);
//           })
//           .attr('x', function(d, i){
//             return 0
//           })
//           .duration(700)
//           .delay(function(d, i){
//             return i * 700
//           });
//           */
        

//     canvas.selectAll('text') 
//       .data(data)
//       .enter()
//         .append('text')
//         .attr('fill', 'white')
//         .attr('y', function(d, i){
//           return i * 50 + 25;
//         })
//         .attr('x', 20)
//         .text(function(d){ return d.name;}
//         );
      
//     canvas.append("g")
//       .attr("transform", "translate(0, 500)") 
//       .call(xAxis);

//   }