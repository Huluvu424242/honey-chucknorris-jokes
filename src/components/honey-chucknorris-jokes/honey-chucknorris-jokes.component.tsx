import {Component, Element, h, Host, Prop, State} from "@stencil/core";
import {Witz} from "./witz";
import {Observable, Subscription} from "rxjs";
import {fromFetch} from "rxjs/fetch";

@Component({
  tag: "honey-chucknorris-jokes",
  styleUrl: "honey-chucknorris-jokes.css",
  shadow: true
})
export class HoneyChucknorrisJokes {

  private static readonly CHUCK_NORRIS_API_URL: string = "https://api.chucknorris.io/jokes/random?category=dev";

  /**
   * Host Element
   */
  @Element() hostElement: HTMLElement;

  /**
   * ID vom Host Tag
   */
  ident: string;

  fetcherSubscription: Subscription;

  @State() witz: Witz = {
    id: "4_kRvuABR7mNQZxh-_UH1A",
    imgurl: "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
    website: "https://api.chucknorris.io/jokes/4_kRvuABR7mNQZxh-_UH1A",
    text: "Chuck Norris' Ipod came with a real charger instead of just a usb cord."
  };

  /**
   * Zeitintervall nachdem ein neuer Witz abgerufen wird (in Sekunden).
   */
  @Prop({attribute: "period", reflect: true, mutable: true}) jokePeriodInSecond: number = 120;


  //
  // @Watch("newsFeed")
  // newsWatcher(newValue: HTMLHoneyNewsFeedElement, oldValue: HTMLHoneyNewsFeedElement) {
  //   oldValue = oldValue;
  //   if (newValue) {
  //     if (this.newsFeed) {
  //       this.newsFeed.feedLoader = this.feedLoader;
  //     }
  //   }
  // }

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
  }

  async componentWillLoad() {
    const fetcher$: Observable<any> = fromFetch(HoneyChucknorrisJokes.CHUCK_NORRIS_API_URL);
    this.fetcherSubscription = fetcher$.subscribe(
      response => response.json().then(data => this.setWitz(data))
    );
  }

  public disconnectedCallback() {
    this.fetcherSubscription.unsubscribe();
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
