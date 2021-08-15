import {Component, Element, h, Host, Prop, State, Watch} from "@stencil/core";
import {Witz} from "./witz";
import {EMPTY, lastValueFrom, Observable, Subscription, timer} from "rxjs";
import {fromFetch} from "rxjs/fetch";
import {catchError, switchMap, tap} from "rxjs/operators";

@Component({
  tag: "honey-chucknorris-jokes",
  styleUrl: "honey-chucknorris-jokes.css",
  shadow: true
})
export class HoneyChucknorrisJokes {

  private static readonly CHUCK_NORRIS_API_URL: string = "https://api.chucknorris.io/jokes/random";
  private static readonly FALLBACK_WITZ: Witz = {
    id: "4_kRvuABR7mNQZxh-_UH1A",
    imgurl: "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
    website: "https://api.chucknorris.io/jokes/4_kRvuABR7mNQZxh-_UH1A",
    text: "Chuck Norris' Ipod came with a real charger instead of just a usb cord."
  }

  /**
   * Host Element
   */
  @Element() hostElement: HTMLElement;

  /**
   * ID vom Host Tag
   */
  ident: string;

  fetcherSubscription: Subscription;

  // Falls fachlich möglich Defaults hinterlegen um Logik einfach zu halten
  @State() witz: Witz;

  /**
   * Zeitintervall nachdem ein neuer Witz abgerufen wird (in Sekunden).
   */
  @Prop({attribute: "period", reflect: false, mutable: true}) changePeriod: number = 20;

  @Watch("changePeriod")
  periodWatcher(newValue: number, oldValue: number) {
    this.printMessage("period changed old:" + oldValue + " new:" + newValue);
    if (newValue && oldValue !== newValue) {
      this.changePeriod = newValue;
      this.fetcherSubscription.unsubscribe();
      this.fetcherSubscription = this.subscribePeriodicFetcher();
      this.printMessage("period changed to:" + this.changePeriod);
    }
  }

  public connectedCallback() {
    // attribute initialisieren wenn defaults notwendig
    this.ident = this.hostElement.id ? this.hostElement.id : Math.random().toString(36).substring(7);
    this.fetcherSubscription = this.subscribePeriodicFetcher();
    this.printMessage("DOM connected");
  }

  public async componentWillLoad() {
    // async damit vor Rendering auf das Laden der Daten gewartet wird
    this.printMessage("Lade Daten" + (new Date().toUTCString()));
    // Fehler behandeln -> sonst dauerhaft kein Rendering
    await lastValueFrom(this.fetchWitz$()).catch(() => {
      this.setWitz(HoneyChucknorrisJokes.FALLBACK_WITZ)
    });
    this.printMessage("Daten geladen");
  }

  public disconnectedCallback() {
    this.fetcherSubscription.unsubscribe();
    this.printMessage("DOM disconnected");
  }

  protected printMessage(message: string): void {
    if (console) {
      console.log((new Date().toUTCString()) + ": " + message);
    }
  }

  protected setWitz(data: any): void {
    this.printMessage("setze neuen  Witz")
    if (data) {
      // trigger rendering nur wenn ref changed
      this.witz = {
        id: data.id,
        imgurl: data.icon_url,
        website: data.url,
        text: data.value
      };
    } else {
      this.printMessage("konnte Witz nicht setzen" )
    }
  }

  protected fetchWitz$(): Observable<Response> {
    return fromFetch(HoneyChucknorrisJokes.CHUCK_NORRIS_API_URL).pipe(
      switchMap(
        (response: Response) => response.json()
      ),
      tap(
        (data: any) => this.setWitz(data)
      ),
      catchError(() => EMPTY)
    )
  }

  protected subscribePeriodicFetcher(): Subscription {
    const timerPeriod: number = this.changePeriod * 1000;
    const fetcher$: Observable<Response> = timer(timerPeriod, timerPeriod).pipe(
      tap(
        () => this.printMessage("neuen Witz angefordert")
      ),
      switchMap
    (
      () => this.fetchWitz$()
    ),
  )
    ;
    return fetcher$.subscribe();
  }

  public render() {
    this.printMessage("rendering");
    return (
      <Host
        id={this.ident}
      >
        <a href={this.witz.website} class={"container"} target={"blank"}>
          <img src={this.witz.imgurl} class={"item logo"}/>
          <p class={"item text"}>{this.witz.text}</p>
        </a>
      </Host>
    );
  }
}
