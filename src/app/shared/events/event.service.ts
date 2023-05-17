import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ngxCsv } from 'ngx-csv';
import { Observable, map } from 'rxjs';
import { LearningEvent } from 'src/app/modules/knowledge-analytics/model/learning-event.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  exportOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    useBom: true,
    noDownload: false,
    headers: [
      'Type',
      'Timestamp',
      'Knowledge Component Id',
      'Learner Id',
      'Event-specific data',
    ],
  };

  constructor(private http: HttpClient) { }

  getAll(): Observable<void> {
    return this.http
      .get<LearningEvent[]>(environment.apiHost + 'events/all/')
      .pipe(map(data => this.exportEvents(data, "All events")));
  }

  getByLearnerAndKc(learnerId: number, kcId: number): Observable<void> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('learnerId', learnerId);
    queryParams = queryParams.append('kcId', kcId);
    return this.http.get<LearningEvent[]>(environment.apiHost + "events/learner", { params: queryParams })
      .pipe(map(data => this.exportEvents(data, "Learner " + learnerId + " - KC " + kcId + " - events")));
  }

  getByAi(aiId: number): Observable<void> {
    return this.http.get<LearningEvent[]>(environment.apiHost + "events/answers/" + aiId)
      .pipe(map(data => this.exportEvents(data, "Assessment " + aiId + " answers")));
  }

  private exportEvents(data: LearningEvent[], title: string) {
    const events = this.parseEvents(data);
    new ngxCsv(events, title, this.exportOptions);
  }

  private parseEvents(data: LearningEvent[]) {
    const events = new Array<LearningEvent>();
    data.forEach(event => events.push(new LearningEvent(event)));

    for (const event of events) {
      if (event.specificData) {
        event.specificData = JSON.stringify(event.specificData);
      }
    }

    return events.sort((a, b) => a.timeStamp.getTime() - b.timeStamp.getTime());
  }
}