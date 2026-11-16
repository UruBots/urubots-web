import type { Publication } from '../../src/lib/publications';

type Source = Omit<Publication, 'id' | 'pdf'> & { pdf?: string | null };

const build = (s: Source): Publication => ({
  ...s,
  id: s.arxiv ? `arxiv-${s.arxiv}` : `doi-${(s.doi ?? '').replace(/^https?:\/\/doi\.org\//, '').replace(/[^\w.]+/g, '-')}`,
  pdf: s.pdf !== undefined ? s.pdf : s.arxiv ? `https://arxiv.org/pdf/${s.arxiv}` : null,
});

const sources: Source[] = [
  // ---- 2026 ----
  {
    kind: 'paper', year: 2026, status: 'accepted', arxiv: '2610.23877', doi: null, bibtexKey: 'sodre2026stressquery',
    title: 'Stress-Query and Temporal Reliability of Vision-Language Models as copilots in Autonomous UAV Navigation',
    authors: ['Hiago Sodre', 'Sebastian Barcelona', 'Vincent Sandin', 'Pablo Moraes', 'Andre S. Kelbouscas', 'Ricardo B. Grando'],
    venue: 'Latin American Robotics Symposium (LARS 2026)',
    summary: 'Stress-tests the temporal bottlenecks and operational reliability of vision-language models acting as copilots in autonomous drone navigation.',
  },
  {
    kind: 'paper', year: 2026, status: 'preprint', arxiv: '2610.23878', doi: null, bibtexKey: 'fernandez2026heterogeneous',
    title: 'A Heterogeneous UAV UGV Methodology for Aerial Tracking of Mini Autonomous Cars',
    authors: ['Santiago Fernandez', 'Angel Gabriel Da Silva', 'Hiago Sodre', 'Pablo Moraes', 'Bruna Guterres', 'Ricardo B. Grando'],
    venue: null,
    summary: 'A cooperative UAV-UGV method in ROS 2 and Gazebo that combines aerial vision and ground state to mitigate occlusions when tracking mini autonomous cars.',
  },
  {
    kind: 'paper', year: 2026, status: 'preprint', arxiv: '2609.26084', doi: null, bibtexKey: 'sodre2026vlmcopilots',
    title: 'Vision-Language Models as copilots for Autonomous UAV Navigation: Analysis of Latency and Reliability in Degraded Environments',
    authors: ['Hiago Sodre', 'Sebastian Barcelona', 'Vincent Sandin', 'Pablo Ezequiel Moraes', 'Ahilen Mazondo', 'Igor Nunes', 'William Moraes', 'Andre L. S. da Kelbouscas', 'Ricardo B. Grando'],
    venue: null,
    summary: 'A hybrid FSM-VLM architecture for GPS-denied drones, measuring format errors versus semantic hallucinations in degraded conditions.',
  },
  {
    kind: 'paper', year: 2026, status: 'preprint', arxiv: '2609.26083', doi: null, bibtexKey: 'moraes2026dualcobots',
    title: 'Situation Aware Locomotion for Dual Mobile Cobots in Shared Environments',
    authors: ['William Moraes', 'Igor Nunes', 'Ahilen Mazondo', 'Sebastian Barcelona', 'Hiago Sodre', 'Pablo Ezequiel Moraes', 'Ricardo B. Grando'],
    venue: null,
    summary: 'Coordinates the locomotion of two mobile cobots in shared industrial spaces through situation awareness, removing zone conflicts in simulation.',
  },
  {
    kind: 'paper', year: 2026, status: 'accepted', arxiv: '2608.07554', doi: null, bibtexKey: 'delossantos2026wildfire',
    title: 'Impact of Dataset Composition on Embedded Real-Time UAV Wildfire Detection Using Compact YOLO Models',
    authors: ['Eduardo de los Santos', 'Andre S. Kelbouscas', 'Ricardo B. Grando', 'Bruna V. Guterres'],
    venue: 'International Conference on Control, Automation and Systems (ICCAS 2026)',
    summary: 'Analyzes how mixing real, augmented and synthetic images affects compact YOLO models for onboard wildfire detection on drones.',
  },
  {
    kind: 'paper', year: 2026, status: 'preprint', arxiv: '2608.02571', doi: null, bibtexKey: 'farias2026quadruped',
    title: 'Situation Aware Frontier Prioritization for Quadruped Search and Rescue',
    authors: ['Kevin Farias', 'Santiago Martin', 'Barbara Flores', 'Vinicio Melgar', 'Igor Nunes', 'Hiago Sodre', 'Pablo Moraes', 'Ricardo B. Grando'],
    venue: null,
    summary: 'Prioritizes exploration frontiers for quadruped rescue robots by weighing information gain, victim relevance and terrain difficulty.',
  },
  {
    kind: 'paper', year: 2026, status: 'preprint', arxiv: '2608.00284', doi: null, bibtexKey: 'moraes2026hybridattention',
    title: 'Hybrid Attention Estimation Pipeline for Adaptive HRI Using an Expressive Robotic Head',
    authors: ['Pablo Moraes', 'Monica Rodriguez', 'Christopher Peters', 'Hiago Sodre', 'Tobias Doernbach', 'Bruna Guterres', 'Ricardo Grando'],
    venue: null,
    summary: 'Combines fast geometric head-pose estimation with VLM-based semantic analysis to track user attention in HRI with an expressive InMoov head.',
  },
  {
    kind: 'paper', year: 2026, status: 'accepted', arxiv: '2605.08136', doi: null, bibtexKey: 'barboza2026rtdetr',
    title: 'Benchmarking ResNet Backbones in RT-DETR: Impact of Depth and Regularization under environmental conditions',
    authors: ['Pamela Barboza', 'Victor Castelli', 'Belen Pereira', 'Ricardo Grando', 'Bruna de Vargas', 'Augusto Calfani', 'Gabriela Flores'],
    venue: 'International Conference on Data Science, Technology and Applications (DATA 2026)',
    summary: 'Compares four ResNet backbones and dropout rates in RT-DETR under lighting and background-contrast changes relevant to competition robotics.',
  },
  // ---- 2025 ----
  {
    kind: 'paper', year: 2025, status: 'published', arxiv: null, bibtexKey: 'peters2025remote',
    doi: 'https://doi.org/10.1007/978-981-95-2379-5_7',
    title: 'Remote vs. Presence Laboratories in Human-Robot Interaction with Social Robots: A Study on Task Performance',
    authors: ['Christopher Peters', 'Kai M. Blum', 'Ibrahim Al Krad', 'Pablo Moraes', 'Ricardo Bedin Grando', 'Reinhard Gerndt', 'Tobias Doernbach'],
    venue: 'International Conference on Social Robotics (ICSR), Springer LNCS',
    summary: 'Experimentally compares task performance and user experience with social robots in remote versus in-person laboratories.',
  },
  {
    kind: 'paper', year: 2025, status: 'published', arxiv: '2508.21271', doi: null, bibtexKey: 'moraes2025miniautonomous3dcnn',
    title: 'Mini Autonomous Car Driving Based on 3D Convolutional Neural Networks',
    authors: ['Pablo Ezequiel Moraes', 'Monica Rodriguez', 'Kristofer S. Kappel', 'Hiago Sodre', 'Santiago Fernandez', 'Igor Nunes', 'Bruna Guterres', 'Ricardo B. Grando'],
    venue: 'XVII Brazilian Robotics Symposium (SBR 2025) / XVI Robotics in Education Workshop (WRE 2025), SBC, pp. 206-212',
    summary: 'Evaluates 3D CNNs with RGB-D input against recurrent architectures for end-to-end autonomous driving on simulated tracks of varying complexity.',
  },
  {
    kind: 'tdp', year: 2025, status: 'preprint', arxiv: '2506.07348', doi: null, bibtexKey: 'moraes2025firapro',
    title: 'UruBots Autonomous Cars Challenge Pro Team Description Paper for FIRA 2025',
    authors: ['Pablo Moraes', 'Monica Rodriguez', 'Sebastian Barcelona', 'Angel Da Silva', 'Santiago Fernandez', 'Hiago Sodre', 'Igor Nunes', 'Bruna de Vargas Guterres', 'Ricardo Bedin Grando'],
    venue: 'FIRA RoboWorld Cup 2025 (Daegu, South Korea)',
    summary: 'Describes the scaled electric vehicle and deep-learning end-to-end control for the Autonomous Cars Challenge Pro category.',
  },
  {
    kind: 'paper', year: 2025, status: 'accepted', arxiv: '2506.00075', doi: null, bibtexKey: 'pollini2025reducinglatency',
    title: 'Reducing Latency in LLM-Based Natural Language Commands Processing for Robot Navigation',
    authors: ['Diego Pollini', 'Bruna V. Guterres', 'Rodrigo S. Guerra', 'Ricardo B. Grando'],
    venue: '23rd IEEE International Conference on Industrial Informatics (INDIN 2025)',
    summary: 'Connects an LLM directly to ROS 2 in Gazebo with no intermediate middleware, cutting navigation-command latency by 7.01%.',
  },
  {
    kind: 'tdp', year: 2025, status: 'preprint', arxiv: '2504.09778', doi: null, bibtexKey: 'farias2025robocuprescue',
    title: 'RoboCup Rescue 2025 Team Description Paper UruBots',
    authors: ['Kevin Farias', 'Pablo Moraes', 'Igor Nunes', 'Juan Deniz', 'Sebastian Barcelona', 'Hiago Sodre', 'William Moraes', 'Monica Rodriguez', 'Ahilen Mazondo', 'Vincent Sandin', 'Gabriel da Silva', 'Victoria Saravia', 'Vinicio Melgar', 'Santiago Fernandez', 'Ricardo Grando'],
    venue: 'RoboCup 2025 Rescue Robot League (Salvador, Brazil)',
    summary: 'Presents the UruBots open rescue robot with ROS, SLAM, perception and HRI for victim detection.',
  },
  {
    kind: 'tdp', year: 2025, status: 'preprint', arxiv: '2504.09755', doi: null, bibtexKey: 'sodre2025robocupwork',
    title: 'UruBots RoboCup Work Team Description Paper',
    authors: ['Hiago Sodre', 'Juan Deniz', 'Pablo Moraes', 'William Moraes', 'Igor Nunes', 'Vincent Sandin', 'Ahilen Mazondo', 'Santiago Fernandez', 'Gabriel da Silva', 'Monica Rodriguez', 'Sebastian Barcelona', 'Ricardo Grando'],
    venue: 'RoboCup 2025 @Work League (Salvador, Brazil)',
    summary: 'Details the hybrid LIMO robot with manipulator for autonomous navigation and industrial manipulation in RoboCup@Work.',
  },
  // ---- 2024 ----
  {
    kind: 'paper', year: 2024, status: 'preprint', arxiv: '2411.05011', doi: null, bibtexKey: 'flores2024extension',
    title: 'De la Extensión a la Investigación: Como La Robótica Estimula el Interés Académico en Estudiantes de Grado',
    authors: ['Gabriela Flores', 'Ahilen Mazondo', 'Pablo Moraes', 'Hiago Sodre', 'Christopher Peters', 'Victoria Saravia', 'Angel Da Silva', 'Santiago Fernandez', 'Bruna de Vargas', 'Andre Kelbouscas', 'Ricardo Grando', 'Nathalie Assuncao'],
    venue: null,
    summary: 'Analyzes how outreach activities and robotics competitions (UruBots) spark research interest among undergraduate students.',
  },
  {
    kind: 'paper', year: 2024, status: 'preprint', arxiv: '2410.19972', doi: null, bibtexKey: 'dasilva2024implementacion',
    title: 'Implementación de Navegación en Plataforma Robótica Móvil Basada en ROS y Gazebo',
    authors: ['Angel Da Silva', 'Santiago Fernandez', 'Braian Vidal', 'Hiago Sodre', 'Pablo Moraes', 'Christopher Peters', 'Sebastian Barcelona', 'Vincent Sandin', 'William Moraes', 'Ahilen Mazondo', 'Brandon Macedo', 'Nathalie Assuncao', 'Bruna de Vargas', 'Andre Kelbouscas', 'Ricardo Grando'],
    venue: null,
    summary: 'Implements and evaluates autonomous mapping and navigation for differential-drive mobile platforms using ROS and Gazebo.',
  },
  {
    kind: 'paper', year: 2024, status: 'preprint', arxiv: '2410.17453', doi: null, bibtexKey: 'sodre2024huskyur5',
    title: 'Configuração e Operação da Plataforma Clearpath Husky A200 e Manipulador Cobot UR5 2-Finger Gripper',
    authors: ['Hiago Sodre', 'Sebastian Barcelona', 'Vincent Sandin', 'Pablo Moraes', 'Christopher Peters', 'Angel da Silva', 'Gabriela Flores', 'Ahilen Mazondo', 'Santiago Fernandez', 'Nathalie Assuncao', 'Bruna de Vargas', 'Ricardo Grando', 'Andre Kelbouscas'],
    venue: 'FEBITEC 2024 (International Category, Rivera, Uruguay)',
    summary: 'Technical guide to the electrical, safety and ROS software integration of the Clearpath Husky A200 with the UR5 collaborative arm and two-finger gripper.',
  },
  {
    kind: 'paper', year: 2024, status: 'preprint', arxiv: '2410.17450', doi: null, bibtexKey: 'moraes2024interacaohumanoides',
    title: 'Interação entre robôs humanoides: desenvolvendo a colaboração e comunicação autônoma',
    authors: ['Pablo Moraes', 'Monica Rodriguez', 'Christopher Peters', 'Hiago Sodre', 'Ahilen Mazondo', 'Vincent Sandin', 'Sebastian Barcelona', 'William Moraes', 'Santiago Fernandez', 'Nathalie Assuncao', 'Bruna de Vargas', 'Tobias Dörnbach', 'Andre Kelbouscas', 'Ricardo Grando'],
    venue: null,
    summary: 'Develops autonomous communication and collaboration protocols between humanoid robots for cooperative tasks.',
  },
  {
    kind: 'paper', year: 2024, status: 'published', arxiv: '2410.07209', bibtexKey: 'moraes2024behaviorcloning',
    doi: 'https://doi.org/10.1109/URUCON63440.2024.10850290',
    title: 'Behavior Cloning for Mini Autonomous Car Path Following',
    authors: ['Pablo Moraes', 'Christopher Peters', 'Hiago Sodre', 'William Moraes', 'Sebastian Barcelona', 'Juan Deniz', 'Victor D. Castelli', 'Bruna de Vargas Guterres', 'Ricardo Bedin Grando'],
    venue: '2024 IEEE URUCON (Montevideo), pp. 1-5',
    summary: 'Applies behavior cloning with convolutional networks to autonomous track following on mini autonomous cars.',
  },
  {
    kind: 'paper', year: 2024, status: 'published', arxiv: '2409.15305', bibtexKey: 'deniz2024situationawareness',
    doi: 'https://doi.org/10.1109/LARS64411.2024.10786413',
    title: 'Real-time Robotics Situation Awareness for Accident Prevention in Industry',
    authors: ['Juan M. Deniz', 'Andre S. Kelboucas', 'Ricardo Bedin Grando'],
    venue: '2024 Latin American Robotics Symposium (LARS), IEEE',
    summary: 'Uses a LoCoBot with YOLO models and text-to-speech to detect missing personal protective equipment in industrial settings.',
  },
  {
    kind: 'tdp', year: 2024, status: 'preprint', arxiv: '2406.08753', doi: null, bibtexKey: 'sodre2024firauav',
    title: 'UruBots UAV -- Air Emergency Service Indoor Team Description Paper for FIRA 2024',
    authors: ['Hiago Sodre', 'Sebastian Barcelona', 'Anthony Scirgalea', 'Brandon Macedo', 'Gabriel Sampson', 'Pablo Moraes', 'William Moraes', 'Victoria Saravia', 'Juan Deniz', 'Bruna Guterres', 'Andre Kelbouscas', 'Ricardo Grando'],
    venue: 'FIRA RoboWorld Cup 2024 (Maranhão, Brazil)',
    summary: 'Describes the vision-guided autonomous drone for indoor missions in the Air Emergency Service Indoor category.',
  },
  {
    kind: 'tdp', year: 2024, status: 'preprint', arxiv: '2406.08745', doi: null, bibtexKey: 'moraes2024firateamone',
    title: 'UruBots Autonomous Cars Team One Description Paper for FIRA 2024',
    authors: ['Pablo Moraes', 'Christopher Peters', 'Any Da Rosa', 'Vinicio Melgar', 'Franco Nunez', 'Maximo Retamar', 'William Moraes', 'Victoria Saravia', 'Hiago Sodre', 'Sebastian Barcelona', 'Anthony Scirgalea', 'Juan Deniz', 'Bruna Guterres', 'Andre Kelbouscas', 'Ricardo Grando'],
    venue: 'FIRA RoboWorld Cup 2024 (Maranhão, Brazil)',
    summary: 'Presents the low-cost hardware and autonomous driving pipeline of UruBots Team One.',
  },
  {
    kind: 'tdp', year: 2024, status: 'preprint', arxiv: '2406.08741', doi: null, bibtexKey: 'moraes2024firateamtwo',
    title: 'UruBots Autonomous Car Team Two: Team Description Paper for FIRA 2024',
    authors: ['William Moraes', 'Juan Deniz', 'Pablo Moraes', 'Christopher Peters', 'Vincent Sandin', 'Gabriel da Silva', 'Franco Nunez', 'Maximo Retamar', 'Victoria Saravia', 'Hiago Sodre', 'Sebastian Barcelona', 'Anthony Scirgalea', 'Bruna Guterres', 'Andre Kelbouscas', 'Ricardo Grando'],
    venue: 'FIRA RoboWorld Cup 2024 (Maranhão, Brazil)',
    summary: 'Describes the ultralight second autonomous vehicle (1.15 kg, Raspberry Pi 4 and CNN).',
  },
  {
    kind: 'paper', year: 2024, status: 'published', arxiv: null, bibtexKey: 'kelbouscas2024creacionurubots',
    doi: 'https://doi.org/10.65628/V2.N2.5',
    title: 'Creación del primer grupo universitario de competencias e investigación en robótica de UTEC: Urubots',
    authors: ['Andre Luiz da Silva Kelbouscas', 'Nathalie Assuncao Minuzi', 'Ricardo Bedin Grando', 'Marion Agustina de Freitas Vidal'],
    venue: 'LINKS Revista Internacional (UTEC), Vol. 2, No. 2',
    summary: 'Documents the origin, interdisciplinary structure and international educational impact of UruBots at UTEC Rivera.',
  },
  {
    kind: 'paper', year: 2024, status: 'published', arxiv: null, bibtexKey: 'dossantos2024cattle',
    doi: 'https://doi.org/10.1109/URUCON63440.2024.10850188',
    title: 'Enhancing cattle farming management: A case study from Uruguay',
    authors: ['Ernesto Dos Santos', 'Bruna de Vargas Guterres', 'Ricardo Bedin Grando', 'Je Nam Jun Junior'],
    venue: '2024 IEEE URUCON (Montevideo)',
    summary: 'Case study on monitoring and data-analysis technologies to improve cattle farm management in Uruguay.',
  },
  // ---- 2023 / 2022 ----
  {
    kind: 'paper', year: 2023, status: 'preprint', arxiv: '2310.17060', doi: null, bibtexKey: 'sodre2023nao',
    title: 'Aplicación de Robots Humanoides como Guías Interactivos en Museos: Una Simulación con el Robot NAO',
    authors: ['Hiago Sodre', 'Pablo Moraes', 'Monica Rodriguez', 'Victor Castelli', 'Pamela Barboza', 'Martin Mattos', 'Guillermo Vivas', 'Bruna de Vargas', 'Tobias Dörnbach', 'Ricardo Grando'],
    venue: 'FEBITEC 2023',
    summary: 'Simulates the NAO humanoid as an interactive museum guide to enrich educational visits.',
  },
  {
    kind: 'paper', year: 2023, status: 'preprint', arxiv: '2310.17058', doi: null, bibtexKey: 'moraes2023dynamixel',
    title: 'Diseño y Desarrollo de Prototipos Robóticos para Competencias de Fútbol utilizando Motores Dynamixel',
    authors: ['Pablo Moraes', 'Hiago Sodre', 'Monica Rodriguez', 'Andre Kelbouscas', 'Jean Schuster', 'Cristiano Schuster', 'Ricardo Grando'],
    venue: 'FEBITEC 2023',
    summary: 'Mechatronic design of the first soccer robot prototypes built on Dynamixel smart servos.',
  },
  {
    kind: 'paper', year: 2022, status: 'preprint', arxiv: '2210.11195', doi: null, bibtexKey: 'sodre2022roboticamovel',
    title: 'Robótica Móvel e Inteligência Artificial para Investigação, Competição e Automatização de Sistemas Industriais',
    authors: ['Hiago Jacobs Sodre Pereira', 'Pablo Ezequiel Moraes', 'Andre Da Silva Kelbouscas', 'Ricardo Grando'],
    venue: null,
    summary: 'Outlines the group\'s founding lines of research, competition and industrial automation with mobile robotics and AI at UTEC.',
  },
];

/** Newest first; stable within a year. */
export const seedPublications: Publication[] = sources.map(build).sort((a, b) => b.year - a.year);
