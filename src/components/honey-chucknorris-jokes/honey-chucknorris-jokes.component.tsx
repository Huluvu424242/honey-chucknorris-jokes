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

  /**
   * Host Element
   */
  @Element() hostElement: HTMLElement;

  /**
   * ID vom Host Tag
   */
  ident: string;

  fetcherSubscription: Subscription;

  @State() witz: Witz;
  // {
  //   id: "4_kRvuABR7mNQZxh-_UH1A",
  //   imgurl: "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
  //   website: "https://api.chucknorris.io/jokes/4_kRvuABR7mNQZxh-_UH1A",
  //   text: "Chuck Norris' Ipod came with a real charger instead of just a usb cord."
  // };

  /**
   * Zeitintervall nachdem ein neuer Witz abgerufen wird (in Sekunden).
   */
  @Prop({attribute: "period", mutable: true}) changePeriod: number = 20;

  @Watch("changePeriod")
  newsWatcher(newValue: number, oldValue: number) {
    console.log("period changed old:" + oldValue + " new:" + newValue);
    if (newValue && oldValue !== newValue) {
      this.changePeriod = newValue;
      this.subscribePeriodicFetcher();
      console.log("period changed to:" + this.changePeriod);
    }
  }

  protected setWitz(data: any): void {
    if (data) {
      // trigger rendering nur wenn ref changed
      this.witz = {
        id: data.id,
        imgurl: data.icon_url,
        website: data.url,
        text: data.value
      };
    }
  }

  public connectedCallback() {
    // attribute initialisieren wenn defaults notwendig
    this.ident = this.hostElement.id ? this.hostElement.id : Math.random().toString(36).substring(7);
    this.fetcherSubscription = this.subscribePeriodicFetcher();
    console.log("DOM connected um: " + (new Date().toUTCString()));
  }

  public async componentWillLoad() {
    console.log("Lade Daten um:  " + (new Date().toUTCString()));
    // Für Anschauungszecke von verzögertem Rendering nächste Zeile nutzen oder inet drosseln
    // await lastValueFrom(timer(5000).pipe(switchMap(() => this.fetchWitz())));
    await lastValueFrom(this.fetchWitz());
    console.log("Daten geladen um:  " + (new Date().toUTCString()));
  }

  public disconnectedCallback() {
    this.fetcherSubscription.unsubscribe();
    console.log("DOM disconnected um: " + (new Date().toUTCString()));
  }

  protected fetchWitz(): Observable<Response> {
    return fromFetch(HoneyChucknorrisJokes.CHUCK_NORRIS_API_URL).pipe(
      catchError(() => EMPTY),
      tap(
        (response: Response) => response.json().then(data => this.setWitz(data))
      )
    )
  }

  protected subscribePeriodicFetcher(): Subscription {
    const timerPeriod: number = this.changePeriod * 1000;
    const fetcher$: Observable<Response> = timer(timerPeriod, timerPeriod).pipe(
      tap(
        () => console.log("neuen Witz angefordert um: " + (new Date().toUTCString()))
      ),
      switchMap(
        () => this.fetchWitz()
      )
    );
    return fetcher$.subscribe();
  }

  public render() {
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
