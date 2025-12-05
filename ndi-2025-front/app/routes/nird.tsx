import type { Route } from "./+types/nird";
import { PageLayout } from "../components/PageLayout";
import "../styles/nirdPage.component.css";
import { Header } from "~/components";
import { Footer } from "~/components";
import { Windows } from "~/components/windows";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Présentation - NIRD" },
    { name: "description", content: "Présentation de l'association NIRD" },
  ];
}
export default function Nird() {
    const overlayX = 100; // px
  const overlayY = 180; // px
  const overlayW = 300; // px
  const overlayH = 200; // px

  return (
    <>
        <Header />
        <div className="margin-top"></div>
        <div className="title">NIRD, Numérique Inclusif, Responsable et Durable</div>



        <div className="text-and-image">
            <Windows className="size"> <img src="https://placecats.com/millie_neo/300/200" /></Windows>
            <div className=" size">
        <div className="sub-title ">Quel problème ?</div>
        <p className="paragraph">
            La fin du support windows 10 a crée rupture dans le continuum espace temps, cette version tant utilisé a forcé beaucoup de gens à changer de version. 
En 2025, c'est 40% des ordinateurs d'entreprise et 50 % des ordinateurs de particulier qui ne sont pas passé de windows 10 à windows 11. 
Ce n'est pas qu'un problème de refus mais aussi d'incompatibilité, 13% des ordinateurs sur windows 10 sont incapables de passer à windows 11. 
De plus Microsoft arrête le suivi de windows 10 ce qui laisse tous ces pc vulnérables aux futus failles de sécurité, ils proposent un service payant pour mettre à jour ces pc individuellement.  
        </p>
        </div>
        </div>


        <div className="text-and-image">
            <div className=" size">
        <div className="sub-title ">Qui sont-ils ?</div>
        <p className="paragraph">
            Qui sont-ils ? 
Le NIRD, Numérique Inclusif, Responsable et Durable, est un collectif qui cherche à empêcher les grands groupes informatiques à s'imposer sur le marché !!! Ceux-ci use de méthode qui empêchent certains principes fondamentaux ! 
<br/>INCLUSION
<br/>RESPONSABILITE
<br/>DURABILITE <br/>
L'inclusion pour que tout le monde puisse accéder à l'informatique sans dénigration
La responsabilité pour comprendre ce qu'on utilise et protégé nos données personelles
La durabilité de nos appareils pour une meilleur sécurité, moins de déchets  
        </p>
        </div>
            <Windows className="size"><img src="https://media.discordapp.net/attachments/1446170649403068452/1446176295401553951/logo_nird.png?ex=69330821&is=6931b6a1&hm=543a72f5276c7bfdaa01574d1e8b45e0404267cda4a89721b758ddcfc332aed4&=&format=webp&quality=lossless&width=1232&height=509" /></Windows>
            
        </div>


        <div className="text-and-image">
            <Windows className="size"><img src="https://placecats.com/bella/300/200" /></Windows>
            <div className=" size">
        <div className="sub-title ">Que font-ils ? </div>
        <p className="paragraph">
            Depuis leur réussite au lycée Carnot de Bruay-la-Buissière, le groupe se déplace d'école en école afin de sensibilier les élèves et les enseignants à ces problèmes.
Ils proposent aux écoles le reconditionnement d'appareil pour rallonger leur durée de vie. Pour éviter l'obsolescense des licenses windows, ils proposent de changer d'OS et d'utiliser Linux.

Linux est un OS open source et qui reste mis à jour par tous les utilisateurs continuellement. Il n'existe pas d'améliorations mais seulement des mises à jours disponibles à tous.     
  </p>
        </div>
        </div>


               <div className="text-and-image">
         <div className=" size">
        <div className="sub-title "> </div>
        <p className="paragraph">
          Ce groupe agis activement pour rendre libre l'utilisation de l'informatique et empêcher les Big tech de dominer le marché et de faire ce qu'ils veulent. 
Il propose une solution durable ne serait-ce que pour les utilisateurs mais aussi la planète.

Si vous voulez aller plus loin, voici quelque liens utiles :
<br/>
 <a href="https://nird.forge.apps.education.fr/index.html" target="_blank" rel="noopener noreferrer">
                        Site officiel du NIRD
                    </a>
  </p>
        

        </div>
        </div>

        


        <Footer />
    </>
  );
}