/*
Dynamic filter, leyfa notendum að filtera innihald á vefsíðunni, bls. 538 - 543
Sýnidæmi: http://javascriptbook.com/code/c12/dynamic-filter.html

Þú byggir allt html innihald.
Í stað þess að smíða/eyða (DOM Manipulation) öll html elements frá grunni (t.d. tafla) í hvert skipti 
sem notandi vill filtera einhver gögn (t.d. með slider), sem hægir á scriptinu þá er betra að búa 
þetta til í smærri einingum (rows) og stýra með show/hide útfrá notandainput (filtering). 

Lausn:

    1) Create a table row for every person
    2) Show the rows for the people that are within the range, hide rows that are outside the range.

*/

(function() {

  // STORE EACH PERSON AS AN OBJECT IN AN ARRAY. It holds name and rate
  let people = [
    {                                              
      name: 'Siffi',                               
      rate: 100
    },
    {
      name: 'Gunni',
      rate: 80
    },
    {
      name: 'Sigga',
      rate: 75
    },
    {
      name: 'Gunna',
      rate: 120
    },
    {
      name: 'Guðvin',
      rate: 30
    }
  ];
  // four global variables are created as they are used throughout the script:
      let rows = [],                    // rows array, holds the cross-referencing array 
      $min = $('#value-min'),           // Minimum text input, holds the input to show the minimum rate
      $max = $('#value-max'),           // Maximum text input, holds the input to show the maximum rate
      $table = $('#rates');             // The table that shows results

  // For each person, a new jQuery object called $row is created containing a <tr> element.
  // The person's name and rate are added in <td>s.
  function makeRows() {                 
    people.forEach(function(person) {   // For each person object in people (current object)
      var $row = $('<ul></ul>');        // Create a row for them
      $row.append( $('<li></li>').text(person.name + "            " +person.rate) );
      
      // A new object with two properties is added to the rows array
      // Create rows array which links people objects to table rows. 
      // Tilgangurinn er að búa til vensl milli object (gagna) og row (framsetningu)
      // Þegar ákveða hvaða röð skuli birtast (filtering), þá er rate athugað í people array en í gegnum reference í rows array. Sjá Update fall.
      // Sjá skýringarmynd á bls. 540-541
      rows.push({                       
        person: person,                 // Reference to the person object, ekki copy
        $element: $row                  // Reference to row as jQuery selection
      });
    });
    // Afhverju að halda utanum reference á People array?
    
    // sjáum hvað er komið í rows array í console
    console.log(rows);
    /* 
    rows = [
        {                                             
          person: person,                              
          $element: $row 
        } 
    ]
    */
  }
    

  // Búum til <tbody> og setjum rows í table í html
  function appendRows() {               // Adds rows to the table
    var $tbody = $('<tbody></tbody>');  // Create <tbody> element
    rows.forEach(function(row) {        // For each object in the rows array
      $tbody.append(row.$element);      // Add the HTML for the row
    });
    $table.append($tbody);              // Add the rows to the table, $table er DOM vísun.
  }

  // Update the table content
  // Goes through each of the objects in the rows array and checks if the rate that the person charges 
  // is more than the minimum and less than the maximum rate shown on the slider.
  function update(min, max) {           
    rows.forEach(function(row) {        
      if (row.person.rate >= min && row.person.rate <= max) { // If in range
        row.$element.show();            // Show the row  (breytir í css display:none eða table-row). table-row lets the element behave like a <tr> element
      } else {                          // Otherwise
        row.$element.hide();            // Hide the row
      }
    });
  }

  // Start
  function byrjun() {
    // Set up the slide control                     
    $('#slider').noUiSlider({           
      range: [0, 150], start: [65, 90], handles: 2, margin: 20, connect: true,
      serialization: {to: [$min, $max],resolution: 1}
    }).change(function() { update($min.val(), $max.val()); });        // change event kallar á update() , val() les úr input reit,  ( change() er shorthand fyrir  .on( "change", handler ) )

    makeRows();                           // Create table rows and rows array
    appendRows();                         // Add the rows to the table
    update($min.val(), $max.val());       // Update table to show matches, upphafstaða
  }

  $(byrjun);                                // Call init() when DOM is ready, $(function) is short for $(document).ready(function)
}());
