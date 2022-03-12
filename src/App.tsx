import "./App.css";
import { seed } from "./util";
import Game from "./Game";
import { useEffect, useState } from "react";
import { Row, RowState } from "./Row";
import { Clue } from "./clue";
// @ts-ignore
import { ReactComponent as Info } from './icons/question-circle.svg';
// @ts-ignore
import { ReactComponent as Close } from './icons/times.svg';
// @ts-ignore
import { ReactComponent as Settings } from './icons/cog.svg';

const maxGuesses = 6;

function useSetting<T>(
  key: string,
  initial: T
): [T, (value: T | ((t: T) => T)) => void] {
  const [current, setCurrent] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initial;
    } catch (e) {
      return initial;
    }
  });
  const setSetting = (value: T | ((t: T) => T)) => {
    try {
      const v = value instanceof Function ? value(current) : value;
      setCurrent(v);
      window.localStorage.setItem(key, JSON.stringify(v));
    } catch (e) {}
  };
  return [current, setSetting];
}

function About() {
  return (
    <div className="App-about">
      <p>
        Msingi wa <i>Maneno</i> ni mchezo <a href="https://www.powerlanguage.co.uk/wordle/" target="_blank"><i>Wordle</i></a>{" "} , uliotungwa na
        
          &nbsp;<a href="https://twitter.com/powerlanguish" target="_blank">Josh Wardle</a>.<br />Mchezo Maneno unafanana na <a href="http://www.ukgameshows.com/ukgs/Lingo" target="_blank"><i>Lingo</i></a> , ambayo inasaidia kujifunza maneno kwa lugha mbalimbali.
      </p>
	  
 
      <p>
        Unaweza kujaribu kukisia neno mara sita.
        <br />
		Unaweza kuchagua urefu wa neno la kukisia kwa njia ya kuvuta kibonyeo telezi, kilichopo katika sehemu ya juu.<br />
        Baada ya kila kisio utapata mrejesho, kama inavyoonyeshwa katika mfano hapo chini.
      </p>
      <Row
        rowState={RowState.LockedIn}
        wordLength={4}
        cluedLetters={[
          { clue: Clue.Elsewhere, letter: "l" },
          { clue: Clue.Correct, letter: "a" },
          { clue: Clue.Absent, letter: "m" },
          { clue: Clue.Absent, letter: "i" },
        ]}
      />
      <p>
        Rangi ya mandharinyuma ya herufi <b>M</b> na <b>I</b> ni jivujivu. Herufi hizi hazimo katika neno.
        <br />
        Rangi ya mandharinyuma ya herufi <b className="green-bg">A</b> ni kijani. Herufi hii imo katika neno, na nafasi yake ni hii.
        <br />
        Rangi ya mandharinyuma ya herufi <b className="yellow-bg">L</b> ni njano. Herufi hii imo katika neno, lakini katika nafasi nyingine.
      </p>
      <p>
        Tunahamisha herufi <b className="yellow-bg">L</b> katika nafasi nyingine:
      </p>
      <Row
        rowState={RowState.LockedIn}
        wordLength={4}
        cluedLetters={[
          { clue: Clue.Correct, letter: "k" },
          { clue: Clue.Correct, letter: "a" },
          { clue: Clue.Correct, letter: "l" },
          { clue: Clue.Absent, letter: "i" },
        ]}
      />
      <p>Karibu tayari!</p>
      <Row
        rowState={RowState.LockedIn}
        wordLength={4}
        cluedLetters={[
          { clue: Clue.Correct, letter: "k" },
          { clue: Clue.Correct, letter: "a" },
          { clue: Clue.Correct, letter: "l" },
          { clue: Clue.Correct, letter: "e" },
        ]}
      />
      <p>Sasa tayari!</p>
	  
	  <p>Ikiwa Maneno haigundui neno uliloandika, unaweza kuliondoa kwa kutumia kibonyeo (⌫) na halafu kuendelea.</p>
	  
	  <p>
	  Unazo njia tatu za kuchezea. Neno linatokana na seti ya maneno unayochagua:
	  </p>
	  
	  <ol className="leftAlign">
	  <li>Maneno yaliyo na herufi tatu. Pia maneno yaliyonyambuliwa yamo. Mifano: leo, nia, afa, aua (maneno 328).</li>

      <li>Maneno yaliyo na herufi nne. Pia maneno yaliyonyambuliwa yamo. Mifano: zuri, afya, afie, hafi, (maneno 2510).</li>

      <li>Maneno yaliyo na herufi tano. Pia maneno yaliyonyambuliwa yamo. Mifano: chozi, elimu, abidi, hampi, (maneno 7546).</li>
	  </ol>
	  
	  <p>Majina ya watu na mahali yameondolewa.</p>
      
	  <p>
		<strong>Mchezo Maneno umetungwa na:</strong><br />
		Arvo Hurskainen, Juho Jouhtim&auml;ki
	  </p>
	  <p>Msimbo uliotumiwa katika mchezu huu Maneno umetungwa kwa kutumia msimbo wa asili wazi.<br />Msimbo wa asili utapatikana hapa:<br />
	  <a href="https://github.com/lynn/hello-wordl" target="_blank">https://github.com/lynn/hello-wordl</a></p>
	  <p>Maneno ya mchezo huu yanatokana na kichanganuzi cha kimofolojia ya Kiswahili, kilichotungwa na SALAMA.</p>
	  <p>
		Unaweza kupeleka maoni yako hapa:{" "}
		<a href="mailto:maneno2022@gmail.com">maneno2022@gmail.com</a>
	  </p>
	  <p>
        Msimbo wa asili wa Maneno unapatikana {" "}
        <a href="https://github.com/timelapse999/maneno" target="_blank">hapa</a>.
      </p>
	  
	  
    </div>
  );
}

function App() {
  type Page = "game" | "about" | "settings";
  
  let infoSeen = window.localStorage.getItem("info");

  const [page, setPage] = useState<Page>("about");
  
  useEffect(() => {
	if (infoSeen === null) {
		setPage("about");
		window.localStorage.setItem("info", JSON.stringify(true));
	}
	else if (infoSeen !== null) {
		setPage("game");
	}
  }, [])
  
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [dark, setDark] = useSetting<boolean>("dark", prefersDark);
  const [colorBlind, setColorBlind] = useSetting<boolean>("colorblind", false);
  const [keyboard, setKeyboard] = useSetting<string>(
    "keyboard",
    "qwertyuiop-asdfghjkl-BzxcvbnmE"
  );
  
  
  const element_info: Info = <Info style={{width: 25, height: 25, marginRight: 5}} />
  const element_close: Close = <Close style={{width: 25, height: 25, position: 'relative', top: 1}} />
  const element_settings: Settings = <Settings style={{width: 25, height: 25}} />
 
  
  useEffect(() => {
    document.body.className = dark ? "dark" : "";
    setTimeout(() => {
      // Avoid transition on page load
      document.body.style.transition = "0.3s background-color ease-out";
    }, 1);
  }, [dark]);

  const link = (icon: Info, label: string, page: Page) => (
    <a
      className="icon-link"
      href="#"
      onClick={() => setPage(page)}
      title={label}
      aria-label={label}
    >
      {icon}
    </a>
  );

  return (
    <div className={"App-container" + (colorBlind ? " color-blind" : "")}>
      <h1>Maneno</h1>
      <div style={{ position: "absolute", right: 5, top: 5 }}>
        {page !== "game" ? (
		  <div className="closeButtonAnimation">
			{link(element_close, "Sulje", "game")}
		  </div>
        ) : (
          <>
            {link(element_info, "Tietoja", "about")}
            {link(element_settings, "Asetukset", "settings")}
          </>
        )}
      </div>
	  
	  {/** TODO: let the player choose a game type from the settings
     * <div style={{ position: "absolute", left: 5, top: 5, visibility: page === "game" ? "visible" : "hidden" }}>
     *   <a
     *     href="#"
     *     onClick={() =>
     *       (document.location = seed
     *         ? "?"
     *         : "?seed=" +
     *           new Date().toISOString().replace(/-/g, "").slice(0, 8))
     *     }
     *   >
     *     {seed ? "Arvo sana" : "P&auml;iv&auml;n sana"}
     *   </a>
     * </div>
	  */}
	  
      {page === "about" && <About />}
	  
		{page === "settings" && (
			<div className="Settings">
			  <div className="Settings-setting">
				<input
				  id="dark-setting"
				  type="checkbox"
				  checked={dark}
				  onChange={() => setDark((x: boolean) => !x)}
				/>
				<label htmlFor="dark-setting">Rangi nyeusi</label>
			  </div>
			  <div className="Settings-setting">
				<input
				  id="colorblind-setting"
				  type="checkbox"
				  checked={colorBlind}
				  onChange={() => setColorBlind((x: boolean) => !x)}
				/>
				<label htmlFor="colorblind-setting">Rangi mbadala</label>
			  </div>

			</div>
		  )}
		  
      <Game 
		maxGuesses={maxGuesses} 
		hidden={page !== "game"}
        colorBlind={colorBlind} 
	   />
	   
	   
    </div>
	
  );
}

export default App;