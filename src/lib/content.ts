// All copy comes verbatim from LANDING PAGE.docx — do not invent.

export type LevelKey = 1 | 2 | 3 | 4 | 5;

export interface Level {
  n: LevelKey;
  eyebrow: string;
  title: string;
  description: string;
  subjects: string[];
  icon: string; // tabler icon name
}

export interface PainPoint {
  title: string;
  description: string;
  icon: string;
}

export interface Benefit {
  n: number;
  title: string;
  description: string;
  icon: string;
}

export interface Audience {
  title: string;
  shortLabel: string;
  description: string;
  icon: string;
  subjects: string[];
  highlighted?: boolean;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

// Hero — chips de áreas (del docx línea 4)
export const heroAreas: string[] = [
  'Anatomía',
  'Fisiología',
  'Medicina Interna',
  'Cirugía',
  'Pediatría',
  'Ginecología',
  'Emergencias',
  'Terapia Intensiva',
];

// Problem — 4 cards (del docx líneas 9-10)
export const problems: PainPoint[] = [
  {
    title: 'Demasiados libros',
    description: 'Información dispersa entre cientos de fuentes y bibliografías diferentes.',
    icon: 'tabler:books',
  },
  {
    title: 'Poco tiempo',
    description: 'Muchos temas que estudiar y un calendario académico que no espera.',
    icon: 'tabler:clock',
  },
  {
    title: 'Falta de integración',
    description: 'Leer, subrayar y memorizar sin lograr integrar la información para resolver casos clínicos.',
    icon: 'tabler:puzzle',
  },
  {
    title: 'Sin orientación',
    description: 'Poca claridad sobre qué estudiar primero y cómo enfocar el razonamiento médico.',
    icon: 'tabler:compass',
  },
];

// Solution — 9 chips de usos (del docx líneas 21-29)
export const solutionUses: string[] = [
  'Consultar temas médicos',
  'Resolver dudas académicas',
  'Crear resúmenes',
  'Generar flashcards',
  'Practicar casos clínicos',
  'Prepararte para exámenes',
  'Repasar ciencias básicas',
  'Integrar fisiología, fisiopatología y clínica',
  'Estudiar con enfoque tipo residencia, USMLE o MIR',
];

// Los 9 usos del docx agrupados temáticamente en 3 categorías para reducir repetición visual.
// El "label" de cada categoría es etiqueta de UI derivada del verbo de los items;
// los items son verbatim del docx. NO se inventa copy nuevo.
export interface SolutionCategory {
  label: string;
  icon: string;
  color: 'blue' | 'emerald' | 'red';
  items: string[];
}

export const solutionCategories: SolutionCategory[] = [
  {
    label: 'Aprender',
    icon: 'tabler:bulb',
    color: 'blue',
    items: [
      'Consultar temas médicos',
      'Resolver dudas académicas',
      'Repasar ciencias básicas',
    ],
  },
  {
    label: 'Crear material',
    icon: 'tabler:sparkles',
    color: 'emerald',
    items: [
      'Crear resúmenes',
      'Generar flashcards',
      'Integrar fisiología, fisiopatología y clínica',
    ],
  },
  {
    label: 'Entrenar para examen',
    icon: 'tabler:target-arrow',
    color: 'red',
    items: [
      'Practicar casos clínicos',
      'Prepararte para exámenes',
      'Estudiar con enfoque tipo residencia, USMLE o MIR',
    ],
  },
];

// Academic Levels — 5 niveles (del docx líneas 33-66)
export const academicLevels: Level[] = [
  {
    n: 1,
    eyebrow: 'Nivel 1',
    title: 'Primeros años de medicina',
    description: 'Ideal para comprender las bases estructurales y celulares del cuerpo humano.',
    subjects: [
      'Anatomía',
      'Histología',
      'Citología',
      'Embriología',
      'Biología celular',
      'Neuroanatomía',
      'Bases morfológicas de la medicina',
    ],
    icon: 'tabler:microscope',
  },
  {
    n: 2,
    eyebrow: 'Nivel 2',
    title: 'Segundo año y ciencias funcionales',
    description: 'Para entender cómo funciona el organismo y cómo se alteran sus mecanismos.',
    subjects: [
      'Fisiología',
      'Bioquímica',
      'Microbiología',
      'Parasitología',
      'Inmunología',
      'Genética',
      'Farmacología básica',
      'Fisiopatología',
    ],
    icon: 'tabler:flask',
  },
  {
    n: 3,
    eyebrow: 'Nivel 3',
    title: 'Ciclo clínico',
    description: 'Para integrar síntomas, signos, diagnóstico y tratamiento.',
    subjects: [
      'Semiología',
      'Medicina Interna',
      'Cirugía',
      'Pediatría',
      'Ginecología y Obstetricia',
      'Emergencias',
      'Salud Pública',
      'Epidemiología',
      'Medicina Familiar',
    ],
    icon: 'tabler:stethoscope',
  },
  {
    n: 4,
    eyebrow: 'Nivel 4',
    title: 'Preparación para la Residencia Médica',
    description: 'Diseñado para estudiar con estrategia, no solo con volumen.',
    subjects: [
      'Bibliografía oficial Bolivia',
      'Preguntas potencialmente preguntables',
      'Casos clínicos tipo examen',
      'Temas de alto rendimiento',
      'Simulacros',
      'Razonamiento clínico',
      'Repaso dirigido por debilidades',
    ],
    icon: 'tabler:trophy',
  },
  {
    n: 5,
    eyebrow: 'Nivel 5',
    title: 'Especialidades médicas',
    description: 'Para médicos que desean actualizarse o profundizar áreas específicas.',
    subjects: [
      'Medicina Interna',
      'Terapia Intensiva',
      'Cardiología',
      'Neumología',
      'Nefrología',
      'Neurología',
      'Infectología',
      'Reumatología',
      'Endocrinología',
      'Gastroenterología',
      'Cirugía General',
      'Anestesiología',
      'Emergencias médicas',
      'Pediatría',
      'Ginecología Obstetricia',
    ],
    icon: 'tabler:medal',
  },
];

// Benefits — 6 cards (del docx líneas 69-80)
export const benefits: Benefit[] = [
  {
    n: 1,
    title: 'Respuestas basadas en libros de medicina',
    description: 'MENTOR CEAM prioriza el conocimiento académico médico, evitando respuestas vagas o poco útiles.',
    icon: 'tabler:book',
  },
  {
    n: 2,
    title: 'Explicación clara y ordenada',
    description: 'Convierte temas complejos en explicaciones comprensibles, estructuradas y aplicables al estudio.',
    icon: 'tabler:list-tree',
  },
  {
    n: 3,
    title: 'Enfoque en razonamiento clínico',
    description: 'Ayuda a entender el “por qué” detrás de cada diagnóstico, tratamiento o mecanismo fisiopatológico.',
    icon: 'tabler:brain',
  },
  {
    n: 4,
    title: 'Preparación para exámenes médicos',
    description: 'Permite entrenar con preguntas, casos clínicos, flashcards y simulaciones orientadas a la Residencia Médica.',
    icon: 'tabler:clipboard-check',
  },
  {
    n: 5,
    title: 'Acompañamiento académico continuo',
    description: 'Disponible para estudiar, repasar y resolver dudas en cualquier momento.',
    icon: 'tabler:clock-hour-4',
  },
  {
    n: 6,
    title: 'Desde ciencias básicas hasta especialidades',
    description: 'No se limita a una materia: acompaña todo el recorrido médico.',
    icon: 'tabler:route',
  },
];

// Audiences — 5 perfiles (del docx líneas 83-92)
export const audiences: Audience[] = [
  {
    title: 'Estudiantes de primeros años',
    shortLabel: 'Primeros años',
    description: 'Para dominar las bases con explicaciones claras y ordenadas.',
    subjects: ['Anatomía', 'Histología', 'Embriología', 'Fisiología', 'Bioquímica', 'Microbiología'],
    icon: 'tabler:school',
  },
  {
    title: 'Estudiantes de ciclos clínicos',
    shortLabel: 'Ciclos clínicos',
    description: 'Para integrar conocimientos con enfoque clínico real.',
    subjects: ['Semiología', 'Fisiopatología', 'Farmacología', 'Medicina Interna'],
    icon: 'tabler:stethoscope',
  },
  {
    title: 'Internos y médicos generales',
    shortLabel: 'Internado',
    description: 'Para repasar y tomar decisiones médicas con seguridad.',
    subjects: ['Diagnósticos', 'Tratamientos', 'Criterios clínicos', 'Toma de decisiones'],
    icon: 'tabler:user-heart',
  },
  {
    title: 'Postulantes a residencia médica',
    shortLabel: 'Residencia',
    description: 'Para prepararse con enfoque de alto rendimiento.',
    subjects: ['Banco de preguntas', 'Casos clínicos', 'Puntos clave', 'Simulacros'],
    icon: 'tabler:trophy',
    highlighted: true,
  },
  {
    title: 'Médicos especialistas',
    shortLabel: 'Especialistas',
    description: 'Para actualizar conceptos y estructurar contenido académico.',
    subjects: ['Repaso por temas', 'Actualización', 'Material académico'],
    icon: 'tabler:medal',
  },
];

// Features — 7 del docx + 1 Active Recall (mencionado en Solution)
export const features: Feature[] = [
  {
    title: 'Resúmenes médicos inteligentes',
    description: 'Genera resúmenes claros, jerarquizados y listos para estudiar.',
    icon: 'tabler:file-text',
  },
  {
    title: 'Casos clínicos interactivos',
    description: 'Entrena tu razonamiento diagnóstico y terapéutico con escenarios clínicos.',
    icon: 'tabler:notebook',
  },
  {
    title: 'Preguntas tipo examen',
    description: 'Practica con preguntas tipo residencia, MIR o USMLE, con opciones y justificación.',
    icon: 'tabler:checkbox',
  },
  {
    title: 'Flashcards de alto rendimiento',
    description: 'Convierte temas extensos en tarjetas de memoria activa.',
    icon: 'tabler:cards',
  },
  {
    title: 'Mapas conceptuales',
    description: 'Organiza temas complejos en estructuras visuales y lógicas.',
    icon: 'tabler:sitemap',
  },
  {
    title: 'Explicaciones paso a paso',
    description: 'Ideal para comprender temas difíciles de fisiología, farmacología, fisiopatología o clínica.',
    icon: 'tabler:list-numbers',
  },
  {
    title: 'Diagnóstico diferencial',
    description: 'Compara enfermedades similares y aprende a diferenciarlas como en la práctica médica real.',
    icon: 'tabler:git-compare',
  },
  {
    title: 'Active Recall + Spaced Repetition',
    description: 'Las dos técnicas con mayor evidencia científica en educación médica, integradas en cada interacción.',
    icon: 'tabler:repeat',
  },
];

// Prompts del docx (verbatim) + metadatos categoría/formato derivados del propio texto.
// La categoría y el formato NO son copy inventado — son tags de UI para escaneo visual.
export interface PromptExample {
  text: string;
  specialty: string;
  format: string;
}

export const promptExamples: PromptExample[] = [
  { text: 'Explícame el ciclo cardíaco paso a paso como para examen de residencia.', specialty: 'Cardiología',   format: 'Examen residencia' },
  { text: 'Hazme 10 preguntas tipo MIR sobre fisiología renal.',                    specialty: 'Fisiología renal', format: 'Preguntas MIR' },
  { text: 'Resume insuficiencia cardíaca según enfoque clínico.',                   specialty: 'Cardiología',   format: 'Resumen clínico' },
  { text: 'Explícame la diferencia entre shock séptico, cardiogénico e hipovolémico.', specialty: 'Emergencias', format: 'Diagnóstico diferencial' },
  { text: 'Crea flashcards sobre antibióticos betalactámicos.',                     specialty: 'Farmacología',  format: 'Flashcards' },
  { text: 'Haz un caso clínico progresivo de neumonía adquirida en la comunidad.',  specialty: 'Neumología',    format: 'Caso clínico' },
  { text: 'Enséñame anatomía del plexo braquial desde cero.',                       specialty: 'Anatomía',      format: 'Tutoría paso a paso' },
  { text: 'Dame los puntos más preguntables de Pediatría para residencia médica.',  specialty: 'Pediatría',     format: 'Alto rendimiento' },
];
