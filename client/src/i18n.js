import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      Dashboard: 'Dashboard',
      Welcome: 'Welcome',
      Developers: 'Developers',
      Register: 'Register',
      Login: 'Login',
      CreateAccount: 'Create Your Account',
      CreateProfile: 'Create profile',
      EditProfile: 'Edit Profile',
      SignInAccount: 'Sign into Your Account',
      SignUp: 'Sign Up',
      DontAccount: "Don't have an account?",
      HaveAccount: 'Already have an account?',
      EmailAddress: 'Email Address',
      AvatarMessage:
        'This site uses Gravatar so if you want a profile image, use a Gravatar email',
      BrowseDevelopers: 'Browse and connect with developers',
      NoProfilesFound: 'No profiles found',
      welcomeMessage:
        'Create a developer profile/portfolio, share posts and get help from other developers',
      DeleteAccount: 'Delete Account',
      required: 'This field is required.',
      remote: 'Please fix this field.',
      email: 'Please enter a valid email address.',
      url: 'Please enter a valid URL.',
      date: 'Please enter a valid date.',
      dateISO: 'Please enter a valid date (ISO).',
      number: 'Please enter a valid number.',
      digits: 'Please enter only digits.',
      creditcard: 'Please enter a valid credit card number.',
      equalTo: 'Please enter the same value again.',
      accept: 'Please enter a value with a valid extension.',
      maxlength: 'Please enter no more than {0} characters.',
      minlength: 'Please enter at least {{min}} characters.',
      rangelength:
        'Please enter a value between {{min}} and {{max}} characters long.',
      range: 'Please enter a value between {{min}} and {{max}}.',
      max: 'Please enter a value less than or equal to {{max}}.',
      min: 'Please enter a value greater than or equal to {{min}}.',
      //ListEducations:
      Title: 'Title',
      FieldOfStudy: 'Field of study',
      Years: 'Years',
      Degree: 'Degree',
      School: 'School',
      AddEducation: 'Add Education',
      EducationCredentials: 'Education Credentials',
      NoEducation: 'No education found',
      //ListExperiences:
      Delete: 'Delete',
      Company: 'Company',
      AddExperience: 'Add Experience',
      ExperienceCredentials: 'Experience Credentials',
      // Edit Profile
      EditIntro: "Let's get some information to make your profile stand out",
      StatusMessage: 'Give us an idea of where you are at in your career',
      CompanyMessage: 'Could be your own company or one you work for',
      WebSiteMessage: 'Could be your own or a company website',
      LocationMessage: 'City & state suggested (eg. Boston, MA)',
      SkillsMessage:
        'Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)',
      GithubMessage:
        'If you want your latest repos and a Github link, include your username',
      BioMessage: 'Tell us a little about yourself',
      AddSocialLinks: 'Add Social Network Links',
      Optional: 'Optional',
      GoBack: 'Go Back',
      StatusPlaceholder: 'Select Professional Status',
      BioPlaceholder: 'A short bio of yourself',
      Skills: 'Skills',
      Location: 'Location',
      Website: 'Website',
      // Status list
      Developer: 'Developer',
      JuniorDeveloper: 'Junior Developer',
      SeniorDeveloper: 'Senior Developer',
      Manager: 'Manager',
      StudentOrLearning: 'Student or Learning',
      InstructorOrTeacher: 'Instructor or Teacher',
      Intern: 'Intern',
      Other: 'Other',
      // PostsList
      WelcomeCommunity: 'Welcome to the community!',
      SaySomething: 'Say Something',
      CreatePost: 'Create a post',
      Submit: 'Submit',
      Posts: 'Posts',
      PostedOn: 'Posted on',
      BackProfiles: 'Back to profiles',
      BackPosts: 'Back to Posts',
      SkillSet: 'Skill Set',
      NoGithub: 'No Github repos exists',
      LeaveComment: 'Leave A Comment',
      CommentPost: 'Comment on this post',
      // Add education
      AddEducationIntro: 'Add any school, bootcamp, etc that you have attended',
      SchoolOrBootcamp: '* School or Bootcamp',
      DegreeOrCertificate: '* Degree or Certificate',
      ProgramDescription: 'Program Description',
      FromDate: 'From Date',
      ToDate: 'To Date',
      // Add Experience
      AddExperienceIntro:
        'Add any developer/programming positions that you have had in the past',
      JobTitle: '* Job Title',
      JobDescription: 'Job Description'
    }
  },
  fr: {
    translation: {
      Dashboard: 'Tableau de bord',
      Welcome: 'Bienvenue',
      Developers: 'Developpeurs',
      Register: "S'inscrire",
      Login: 'Se connecter',
      CreateAccount: 'Créez votre compte',
      CreateProfile: 'Créer un profil',
      EditProfile: 'Editer le profil',
      SignInAccount: 'Connectez-vous à votre compte',
      SignUp: "S'inscrire",
      DontAccount: "Vous n'avez pas de compte?",
      HaveAccount: 'Vous avez déjà un compte?',
      EmailAddress: 'Adresse e-mail',
      AvatarMessage:
        'Ce site utilise Gravatar, donc si vous voulez une image de profil, utilisez un email Gravatar',
      BrowseDevelopers: 'Parcourir et se connecter avec les développeurs',
      NoProfilesFound: 'Aucun profil trouvé',
      welcomeMessage:
        "Créez un profil / portefeuille de développeurs, partagez des publications et obtenez l'aide d'autres développeurs",
      DeleteAccount: 'Supprimer le compte',
      required: 'Ce champ est obligatoire.',
      remote: 'Veuillez corriger ce champ.',
      email: 'Veuillez fournir une adresse électronique valide.',
      url: 'Veuillez fournir une adresse URL valide.',
      date: 'Veuillez fournir une date valide.',
      dateISO: 'Veuillez fournir une date valide (ISO).',
      number: 'Veuillez fournir un numéro valide.',
      digits: 'Veuillez fournir seulement des chiffres.',
      creditcard: 'Veuillez fournir un numéro de carte de crédit valide.',
      equalTo: 'Veuillez fournir encore la même valeur.',
      notEqualTo:
        'Veuillez fournir une valeur différente, les valeurs ne doivent pas être identiques.',
      extension: 'Veuillez fournir une valeur avec une extension valide.',
      maxlength: 'Veuillez fournir au plus {{max}} caractères.',
      minlength: 'Veuillez fournir au moins {{min}} caractères.',
      rangelength:
        'Veuillez fournir une valeur qui contient entre {{min}} et {{max}} caractères.',
      range: 'Veuillez fournir une valeur entre {{min}} et {{max}}.',
      max: 'Veuillez fournir une valeur inférieure ou égale à {{max}}.',
      min: 'Veuillez fournir une valeur supérieure ou égale à {{min}}.',
      //ListEducations
      Title: 'Titre',
      FieldOfStudy: 'Domaine d`étude',
      Years: 'Années',
      School: 'École',
      Degree: 'Diplôme',
      AddEducation: "Ajouter l'éducation",
      EducationCredentials: 'Éducation Credentials',
      NoEducation: 'Aucune éducation trouvée',
      //ListExperiences
      Delete: 'Supprimer',
      Company: 'Entreprise',
      AddExperience: 'Ajouter une Expérience',
      ExperienceCredentials: 'Expérience Credentials',
      NoExperience: 'Aucune expérience trouvée',
      // Edit Profile
      EditIntro:
        'Obtenons quelques informations pour faire ressortir votre profil',
      StatusMessage:
        'Donnez-nous une idée de où vous en êtes dans votre carrière',
      CompanyMessage:
        'Peut être votre propre entreprise ou celle pour laquelle vous travaillez',
      WebSiteMessage:
        "Peut-être votre propre site Web ou celui de l'entreprise",
      LocationMessage: 'Ville et État suggérés (par exemple, Boston, MA)',
      SkillsMessage:
        'Veuillez utiliser des valeurs séparées par des virgules (par exemple, HTML, CSS, JavaScript, PHP)',
      GithubMessage:
        "Si vous voulez votre dernier dépôt et un lien Github, incluez votre nom d'utilisateur",
      BioMessage: 'Parle-nous un peu de toi',
      AddSocialLinks: 'Ajouter des liens de réseaux sociaux',
      Optional: 'Optionnel',
      GoBack: 'Retour',
      StatusPlaceholder: 'Sélectionnez le statut professionnel',
      BioPlaceholder: 'Une courte biographie de toi',
      Skills: 'Compétences',
      Location: 'Location',
      Website: 'Site web',
      // Status list
      Developer: 'Développeur',
      JuniorDeveloper: 'Développeur Débutant',
      SeniorDeveloper: 'Développeur Sénior',
      Manager: 'Directeur',
      StudentOrLearning: 'Étudiant ou Apprentissage',
      InstructorOrTeacher: 'Instructeur ou Enseignant',
      Intern: 'Stagiaire',
      Other: 'Autre',
      // PostsList
      WelcomeCommunity: 'Bienvenue dans la communauté!',
      SaySomething: 'Dis quelquechose',
      CreatePost: 'Créer un post',
      Submit: 'Envoyer',
      Posts: 'Liste des postes',
      PostedOn: 'Posté sur',
      BackProfiles: 'Retour aux profils',
      BackPosts: 'Retour aux postes',
      SkillSet: 'Ensemble de compétences',
      NoGithub: "Il n'y a pas de repos Github",
      LeaveComment: 'Laissez un commentaire',
      CommentPost: 'Commentez cet article',
      // Add education
      AddEducationIntro:
        "Ajoutez n'importe quelle école, bootcamp, etc. que vous avez fréquenté",
      SchoolOrBootcamp: '* École ou Bootcamp',
      DegreeOrCertificate: '* Diplôme ou Certificat',
      ProgramDescription: 'Description du programme',
      FromDate: 'Date de début',
      ToDate: 'Date de fin',
      // Add Experience
      AddExperienceIntro:
        'Ajoutez tous les postes de développeur / de programmation que vous avez occupés par le passé',
      JobTitle: '* Profession',
      JobDescription: "Description de l'emploi"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: navigator.language || 'en',
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
