import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sheducer',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule, 
    RouterOutlet, 
    RouterLink, 
    ReactiveFormsModule, 
    FullCalendarModule, 
    HttpClientModule
  ],
  templateUrl: './sheducer.component.html',
  styleUrls: ['./sheducer.component.scss']
})
export class SheducerComponent {
  events: any[] = [
    { title: 'Event 1', start: '2024-11-02' },
    { title: 'Event next', start: '2024-11-11' },
    { title: 'Event 2', start: '2024-12-12' },
    { title: 'Bầu cử Tổng thống Mỹ', start: '2024-11-02' },
    { title: 'Bầu cử Test', start: '2024-11-02' },
    { title: 'Bầu cử quốc hội', start: '2024-11-02' },
  ];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: this.events, // Assign events here
    eventClick: this.handleEventClick.bind(this),
  };

    // Biến để lưu trữ thông tin sự kiện khi người dùng nhấn vào ô lịch
    selectedEvent: any = null;

    // Xử lý khi người dùng nhấp vào sự kiện
    handleEventClick(info: any) {
      // Lưu thông tin sự kiện đã nhấn vào selectedEvent
      this.selectedEvent = {
        title: info.event.title,
        start: info.event.start.toISOString().split('T')[0], // Chuyển đổi start thành định dạng ngày YYYY-MM-DD
      };
    }
}
