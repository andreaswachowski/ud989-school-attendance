// TODO
// - Modify model.init() to randomly initialize attendance
// - Use local storage
$(function() {
    var model = {
        numDays: 12,

        students: [
            {
                name: 'Slappy the Frog'
            },
            {
                name: 'Lily the Lizard'
            },
            {
                name: 'Paulrus the Walrus'
            },
            {
                name: 'Gregory the Goat'
            },
            {
                name: 'Adam the Anaconda'
            }
        ],

        init: function() {
            for (var i=0;i<this.students.length; i++) {
                this.students[i].attendance = Array(this.numDays).fill(false);
                this.students[i].daysMissed = this.numDays;
            }
        }
    };

    var controller = {
        init : function() {
            model.init();
            view.init();
        },

        getNumCols : function() {
            return model.numDays;
        },

        getStudents : function() {
            return model.students;
        },

        toggleAttendance : function(student,day) {
            student.attendance[day] = !student.attendance[day];
            student.daysMissed = student.attendance[day] ? student.daysMissed-1 : student.daysMissed+1;
            view.render();
        }
    };

    var view = {
        init: function() {
            var numCols = controller.getNumCols(),
                students = controller.getStudents(),
                $headerRow = $('#days-missed'),
                $dataRow = $('<tr class="student"></tr>');

            // Can the loop be replaced with something more idiomatic in Jquery?
            for (var col = 1; col <= numCols; col++) {
                $headerRow.before('<th>'+col+'</th>');

                // Assemble a template row and use this fragment
                // to add the rows for each student
                $dataRow.append('<td class="attend-col"><input type="checkbox"></td>');
            }

            // For each student, append a customized copy of the template row to the body
            for (var sIdx = 0; sIdx < students.length; sIdx++) {
                var student = students[sIdx].name;
                $('tbody').append($dataRow.clone()
                                  .prepend('<td class="name-col">'+student+'</td>')
                                  .append('<td class="missed-col">'+students[sIdx].daysMissed+'</td>'));
            }

            $('tbody input').click((function(self) {
                return function() {
                    controller.toggleAttendance(self.getStudent(this.parentNode.parentNode.rowIndex),
                                                self.getDay(this.parentNode.cellIndex));
                };
            })(this));
        },

        getStudent: function(row) {
            return controller.getStudents()[row-1];
        },

        getDay: function(col) {
            return col;
        },

        render: function() {
            $('tbody .missed-col').text(function(index,text) {
                return controller.getStudents()[index].daysMissed;
            });
        }
    };

    controller.init();
});
