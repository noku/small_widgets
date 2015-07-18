Session.setDefault("showEditEvent", false);
Session.setDefault("event_id", null);
Session.setDefault("event", null);

Template.calendar.rendered = function() {

    /* initialize the external events
     -----------------------------------------------------------------*/
    ini_events($('#external-events div.external-event'));

    /* initialize the calendar
     -----------------------------------------------------------------*/
    //Date for the calendar events (dummy data)
    var date = new Date();
    var d = date.getDate(),
            m = date.getMonth(),
            y = date.getFullYear();
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        buttonText: {//This is to add icons to the visible buttons
            prev: "<span class='fa fa-caret-left'></span>",
            next: "<span class='fa fa-caret-right'></span>",
            today: 'today',
            month: 'month',
            week: 'week',
            day: 'day'
        },
        eventClick: function(callEvent,jsEvent,view){
            Session.set('event', callEvent);
            Session.set('event_id', callEvent.id);
            Session.set('showEditEvent', true);
        },
        //Random default events
        events: function(start, end, callback) {
          var events = [];
          callEvents = CallEvents.find();
          callEvents.forEach(function(evt){
            events.push({
              id: evt._id,
              title: evt.title,
              start: evt.start,
              end: evt.end,
              allDay: evt.allDay,
              backgroundColor:  evt.backgroundColor,
              borderColor: evt.borderColor
            });
          });
          callback(events);
        },
        editable: true,
        droppable: true, // this allows things to be dropped onto the calendar !!!
        drop: function(date, allDay) { // this function is called when something is dropped

            // retrieve the dropped element's stored Event Object
            var originalEventObject = $(this).data('eventObject');

            // we need to copy it, so that multiple events don't have a reference to the same object
            var copiedEventObject = $.extend({}, originalEventObject);

            // assign it the date that was reported
            copiedEventObject.start = date;
            copiedEventObject.allDay = allDay;
            copiedEventObject.backgroundColor = $(this).css("background-color");
            copiedEventObject.borderColor = $(this).css("border-color");

            // add calendar events
            CallEvents.insert(copiedEventObject);

            // render the event on the calendar
            // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
            $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

            // is the "remove after drop" checkbox checked?
            if ($('#drop-remove').is(':checked')) {
                // if so, remove the element from the "Draggable Events" list
                // remove the ellement
                var id = Events.findOne({title: copiedEventObject.title})._id;
                Events.remove(id);
            }
        },
        eventDrop: function(callEvent){
            CallEvents.update(callEvent.id, {$set: {start: callEvent.start, end: callEvent.end, allDay: callEvent.allDay }})
        },
        eventResize: function(callEvent){
            CallEvents.update(callEvent.id, {$set: {start: callEvent.start, end: callEvent.end, allDay: callEvent.allDay }})
        }
    });
}

Template.calendar.showEditEvent = function(){
    return Session.get('showEditEvent');
}

Template.editEvent.evt = function() {
    var callevent= CallEvents.findOne({_id: Session.get("event_id")});
    return callevent;
}

Template.editEvent.events({
    'click .save': function(e, template){
        // need improvement
        var temp_event = Session.get('event'),
            title = template.find('.title').value;
        upadateCallEvent(Session.get('event_id'), title);
        temp_event.title = title;
        $('#calendar').fullCalendar('updateEvent', temp_event);
        Session.set('event', null);
        Session.set('event_id', null);
        Session.set('showEditEvent', false);
    },
    'click .close':function(e, template){
        Session.set('showEditEvent', false);
    },
    'click .delete':function(e, template){
        // temporary
        var temp_event = Session.get('event');
        temp_event.start = 0;
        CallEvents.remove(Session.get('event_id'));
        Session.set('event', temp_event);
        Session.set('event_id', null);
        Session.set('showEditEvent', false);
        $('#calendar').fullCalendar('updateEvent', temp_event);
    }
});

var upadateCallEvent = function(id, title){
    CallEvents.update(id, {$set: {title:title}});
    return true;
}
