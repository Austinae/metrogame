// https://flagicons.lipis.dev/
import FranceFlag from 'assets/images/flags/france.svg'
import BelgiumFlag from 'assets/images/flags/belgium.svg'
import GreatBritainFlag from 'assets/images/flags/greatbritain.svg'
import UnitedStatesFlag from 'assets/images/flags/unitedstates.svg'
import ChinaFlag from 'assets/images/flags/china.svg'
import SouthKoreaFlag from 'assets/images/flags/southkorea.svg'
import SpainFlag from 'assets/images/flags/spain.svg'
import IndiaFlag from 'assets/images/flags/india.svg'
import RussiaFlag from 'assets/images/flags/russia.svg'
import JapanFlag from 'assets/images/flags/japan.svg'

import BeijingIcon from 'assets/images/metro-icons/beijing.svg'
import DelhiIcon from 'assets/images/metro-icons/delhi.svg'
import GuangzhouIcon from 'assets/images/metro-icons/guangzhou.svg'
import LondonIcon from 'assets/images/metro-icons/london.svg'
import LyonIcon from 'assets/images/metro-icons/lyon.svg'
import MadridIcon from 'assets/images/metro-icons/madrid.svg'
import NewYorkIcon from 'assets/images/metro-icons/newyork.svg'
import ParisIcon from 'assets/images/metro-icons/paris.svg'
import ShanghaiIcon from 'assets/images/metro-icons/shanghai.svg'
import SeoulIcon from 'assets/images/metro-icons/seoul.svg'
import MoscowIcon from 'assets/images/metro-icons/moscow.svg'
import TokyoIcon from 'assets/images/metro-icons/tokyo.svg'
import LilleIcon from 'assets/images/metro-icons/lille.svg'
import MarseilleIcon from 'assets/images/metro-icons/marseille.svg'
import ToulouseIcon from 'assets/images/metro-icons/toulouse.svg'
import RennesIcon from 'assets/images/metro-icons/rennes.svg'
import BrusselsIcon from 'assets/images/metro-icons/brussels.svg'

// https://www.ncbi.nlm.nih.gov/books/NBK7249/
const countryFlags = {
	be: BelgiumFlag,
	// en: EnglandFlag,
	fr: FranceFlag,
	gb: GreatBritainFlag,
	// cn: ChinaFlag,
	// kr: SouthKoreaFlag,
	// us: UnitedStatesFlag,
	// es: SpainFlag,
	// in: IndiaFlag,
	// ru: RussiaFlag,
	// en: JapanFlag,
}

const regions =  [
	{
		key: 'lille',
		title: 'Lille',
		image: 'https://woody.cloudly.space/app/uploads/crt-hautsdefrance/2020/12/thumbs/lille---vue-de-la-grand-place-crtc-hauts-de-france---stephanie-gheearert-640x854.jpg',
		country: countryFlags.fr,
		countryKey: 'fr',
		icon: LilleIcon,
		opened: 1983,
    length: "43.7 km (19.9 mi)",
    yearlyRidership: "112 (2016)",
		amountLines: 2,
		amountStations: 60,
		map: 'https://media.ilevia.fr/prod-cms/wysiwyg/1687856573_plan-metro-tram-lille.jpg',
		ticket: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Carte_Pass_Pass_%28Recto%29.JPG',
	},
	{
		key: 'rennes',
		title: 'Rennes',
		image: 'https://images.ctfassets.net/zmjc9gr9hbbf/1xlTPU0ANvx9tx7Oqmhaxp/3b3e3bbce6a6b358903686503c5ed321/The_medieval_half-timber_houses_of_Rennes.jpg',
		country: countryFlags.fr,
		countryKey: 'fr',
		icon: RennesIcon,
    opened: 2002,
    length: "22.4 km (13.9 mi)",
    yearlyRidership: "32.7 (2021)",
		amountLines: 2,
		amountStations: 30,
		map: 'https://img.annuaire-mairie.fr/img/transport/metro/plan-metro-rennes.png',
		ticket: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Ticket_rechargeable_STAR_Rennes.jpg',
  },
	{
		key: 'toulouse',
		title: 'Toulouse',
		image: 'https://www.trecobat.fr/wp-content/uploads/2022/07/toulouse-trecobat-constructeur-adobestock.jpg',
		country: countryFlags.fr,
		countryKey: 'fr',
		icon: ToulouseIcon,
    opened: 1993,
    length: "28.2 km (17.5 mi)",
    yearlyRidership: "84.4 (2021)",
		amountLines: 2,
		amountStations: 38,
		map: 'http://www.loomji.fr/i/plan/metro/plan-metro-toulouse.gif',
		ticket: 'https://static.actu.fr/uploads/2023/06/ticket-tisseo-960x640.jpg',
	},
	{
		key: 'marseille',
		title: 'Marseille',
		image: 'https://media.routard.com/image/32/8/marseille-port.1558328.jpg',
		country: countryFlags.fr,
		countryKey: 'fr',
		icon: MarseilleIcon,
    opened: 1977,
    length: "22.7 km (14.1 mi)",
    yearlyRidership: "57.9 (2021)",
		amountLines: 2,
		amountStations: 31,
		map: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Marseille_-_Metro_-_Netzplan.png',
		ticket: 'https://www.delcampe.net/static/img_large/auction/000/368/738/515_001.jpg',
	},
	{
		key: 'lyon',
		title: 'Lyon',
		image: 'https://www.visiterlyon.com/var/site/storage/images/2/1/0/2/122012-2-fre-FR/Fourviere%C2%A9T.Deschamps-65.jpg',
		country: countryFlags.fr,
		countryKey: 'fr',
		icon: LyonIcon,
		opened: 1978,
    length: "32.0 km (19.9 mi)",
    yearlyRidership: "159 (2021)",
		amountLines: 4,
		amountStations: 40,
		map: 'https://www.ges-lyon.fr/wp-content/uploads/2022/08/plan-metro-lyon-img.png',
		ticket: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/M%C3%A9tro_de_Lyon_-_Tickets.jpg',
	},
	{
		key: 'paris',
		title: 'Paris',
		image: 'https://static01.nyt.com/images/2023/07/01/travel/22hours-paris-tjzf/22hours-paris-tjzf-superJumbo.jpg',
		country: countryFlags.fr,
		countryKey: 'fr',
		icon: ParisIcon,
		opened: 1900,
    length: "226.9 km (141.0 mi)",
    yearlyRidership: "1339 (2022)",
		amountLines: 16,
		amountStations: 308,
		map: 'https://metromap.fr/assets/img/map.png',
		stock: 'https://upload.wikimedia.org/wikipedia/fr/timeline/md6u9piccuufrvyy5ie98ommgt7d664.png',
		ticket: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Ticket_metro_Paris_recto_%26_verso.jpg',
	},
	{
		key: 'brussels',
		title: 'Brussels',
		image: 'https://a.cdn-hotels.com/gdcs/production178/d1699/8f999c57-cf7b-47cf-9252-8e3513ef570d.jpg',
		country: countryFlags.be,
		countryKey: 'be',
		icon: BrusselsIcon,
    opened: 1976,
    length: "39.9 km (24.8 mi)",
    yearlyRidership: "96.3 (2021)",
		amountLines: 4,
		amountStations: 59,
		map: 'https://metroville.fr/plans/size/plan-metro-bruxelles-1100.webp',
		ticket: 'https://upload.wikimedia.org/wikipedia/commons/4/40/TicketChipSTIB.jpg',
  },
	{
		key: 'london',
		title: 'London',
		image: 'https://assets.editorial.aetnd.com/uploads/2019/03/topic-london-gettyimages-760251843-feature.jpg',
		country: countryFlags.gb,
		countryKey: 'gb',
		icon: LondonIcon,
    opened: 1863,
    length: "402 km (250 mi)",
    yearlyRidership: "1,026 (2022*)",
		amountLines: 11,
		amountStations: 272,
		map: 'https://www.londontubemap.org/maps/London-tube-map-2023.png',
		ticket: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Oystercard.jpg',
  },
]

export { countryFlags }
export default regions