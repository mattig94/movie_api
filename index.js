const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser');

const app = express();

//Top 10 movies
let movies = [
  {
    "title": "Pride and Prejudice",
    "description": "In this adaptation of Jane Austen's beloved novel, Elizabeth Bennet lives with her mother, father and sisters in the English countryside. As the eldest, she faces mounting pressure from her parents to marry. When the outspoken Elizabeth is introduced to the handsome and upper-class Mr. Darcy, sparks fly. Although there is obvious chemistry between the two, Darcy's overly reserved nature threatens the fledgling relationship.",
    "genre": ["dram", "romance"],
    "director": "Joe Wright",
    "releaseYear": "2005",
    "imgURL": "prideandprejudice.jpg",
    "featured": "false"
  },
  {
    "title": "What a Girl Wants",
    "description": "On a whim, American teenager Daphne boards a plane to England to find the father she never met. Upon arriving there, though, she makes a startling discovery: The man she's looking for is Lord Henry Dashwood, a member of the British upper class, who is running for political office. Lord Henry didn't know Daphne existed, but he welcomes her into his life. However, she isn't so sure -- and his family and his current betrothed look on her disapprovingly.",
    "genre": ["comedy", "drama", "family"],
    "director": "Dennie Gordon",
    "releaseYear": "2003",
    "imgURL": "whatagirlwants.jpg",
    "featured": "false"
  },
  {
    "title": "10 Things I Hate About You",
    "description": "Kat Stratford is beautiful, smart and quite abrasive to most of her fellow teens, meaning that she doesn't attract many boys. Unfortunately for her younger sister, Bianca, house rules say that she can't date until Kat has a boyfriend, so strings are pulled to set the dour damsel up for a romance. Soon Kat crosses paths with handsome new arrival Patrick Verona. Will Kat let her guard down enough to fall for the effortlessly charming Patrick?",
    "genre": ["comedy", "drama", "romance"],
    "director": "Gil Junger",
    "releaseYear": "1999",
    "imgURL": "10thingsihateaboutyou.jpg",
    "featured": "false"
  },
  {
    "title": "Clueless",
    "description": "Shallow, rich and socially successful Cher is at the top of her Beverly Hills high school's pecking scale. Seeing herself as a matchmaker, Cher first coaxes two teachers into dating each other. Emboldened by her success, she decides to give hopelessly klutzy new student Tai a makeover. When Tai becomes more popular than she is, Cher realizes that her disapproving ex-stepbrother was right about how misguided she was -- and falls for him.",
    "genre": ["comedy", "romance"],
    "director": "Amy Heckerling",
    "releaseYear": "1995",
    "imgURL": "clueless.jpg",
    "featured": "false"
  },
  {
    "title": "13 Going on 30",
    "description": "A girl who's sick of the social strictures of junior high is transformed into a grownup overnight. In this feel-good fairy tale, teenager Jenna wants a boyfriend, and when she's unable to find one, she fantasizes about being a well-adjusted adult. Suddenly, her secret desire becomes a reality, and she is transformed into a 30-year-old. But adulthood, with its own set of male-female challenges, isn't as easy as it looks.",
    "genre": ["comedy", "fantasy", "romance"],
    "director": "Gary Winick",
    "releaseYear": "2004",
    "imgURL": "13goingon30.jpg",
    "featured": "false"
  },
  {
    "title": "27 Dresses",
    "description": "Perennial bridesmaid Jane always puts the needs of others before her own, making her the go-to gal whenever someone needs help with wedding plans. So when Jane's younger sister Tess snags the man Jane secretly loves, Jane finds herself questioning her role as a wedding junkie for the first time in her life. Meanwhile, a handsome reporter sees Jane's unusual story as his ticket off the bridal beat.",
    "genre": ["comedy", "romance"],
    "director": "Anne Fletcher",
    "releaseYear": "2008",
    "imgURL": "27dresses.jpg",
    "featured": "false"
  },
  {
    "title": "The Devil Wears Prada",
    "description": "Andy is a recent college graduate with big dreams. Upon landing a job at prestigious Runway magazine, she finds herself the assistant to diabolical editor Miranda Priestly. Andy questions her ability to survive her grim tour as Miranda's whipping girl without getting scorched.",
    "genre": ["comedy", "drama"],
    "director": "David Frankel",
    "releaseYear": "2006",
    "imgURL": "thedevilwearsprada.jpg",
    "featured": "false"
  },
  {
    "title": "Mean Girls",
    "description": "Teenage Cady Heron was educated in Africa by her scientist parents. When her family moves to the suburbs of Illinois, Cady finally gets to experience public school and gets a quick primer on the cruel, tacit laws of popularity that divide her fellow students into tightly knit cliques. She unwittingly finds herself in the good graces of an elite group of cool students dubbed \"the Plastics,\" but Cady soon realizes how her shallow group of new friends earned this nickname.",
    "genre": ["comedy"],
    "director": "Mark Waters",
    "releaseYear": "2004",
    "imgURL": "meangirls.jpg",
    "featured": "false"
  },
  {
    "title": "Legally Blonde",
    "description": "Elle Woods has it all. She wants nothing more than to be Mrs. Warner Huntington III. But there is one thing stopping him from proposing: She is too blond. Elle rallies all of her resources and gets into Harvard, determined to win him back.",
    "genre": ["comdey", "romance"],
    "director": "Robert Luketic",
    "releaseYear": "2001",
    "imgURL": "legallyblonde.jpg",
    "featured": "false"
  },
  {
    "title": "Miss Congeniality",
    "description": "When a terrorist threatens to bomb the Miss United States pageant, the FBI rushes to find a female agent to go undercover as a contestant. Unfortunately, Gracie is the only female FBI agent who can \"look the part\" despite her complete lack of refinement and femininity. She prides herself in being \"just one of the boys\" and is horrified at the idea of becoming a girly girl.",
    "genre": ["action", "comdey", "crime"],
    "director": "Donald Petrie",
    "releaseYear": "2000",
    "imgURL": "misscongeniality.jpg",
    "featured": "false"
  }
];

let genres = [
  {
    "name": "drama",
    "description": "Serious presentations or stories with settings or life situations that portray realistic characters in conflict with either themselves, others, or forces of nature. A dramatic film shows us human beings at their best, their worst, and everything in-between. Each of the types of subject-matter themes have various kinds of dramatic plots. Dramatic films are probably the largest film genre because they include a broad spectrum of films."
  },
  {
    "name": "romance",
    "description": "Love stories, or affairs of the heart that center on passion, emotion, and the romantic, affectionate involvement of the main characters (usually a leading man and lady), and the journey that their love takes through courtship or marriage. Romance films make the love story or the search for love the main plot focus. Oftentimes, lovers in screen romances (often romantic dramas) face obstacles and the hazards of hardship, finances, physical illness, racial or social class status, occupation, psychological restraints, or family that threaten to break their union and attainment of love. As in all romantic relationships, tensions of day-to-day life, temptations (of infidelity), and differences in compatibility enter into the plots of romantic films."
  },
  {
    "name": "comedy",
    "description": "\"Make 'em laugh\" films designed to elicit laughter from the audience. Comedies are light-hearted dramas, crafted to amuse, entertain, and provoke enjoyment. The comedy genre humorously exaggerates the situation, the language, action, and characters. Comedies observe the deficiencies, foibles, and frustrations of life, providing merriment and a momentary escape from day-to-day life. They usually have happy endings, although the humor may have a serious or pessimistic side."
  },
  {
    "name": "family",
    "description": "Non-offensive, wholesome, and entertaining films (usually rated G for \"suitable for general audiences\") that do not include topics or scenes with violence, foul language and other profanity, religious issues, gratuitous sexuality and so on, and are specifically designed for children 12 and under (or for family viewing). Family-oriented films may actually be suitable for all age groups, and cover a wide range of genre categories (comedy, adventure, fantasy, musicals, etc.). They often include a child actor/actress, and/or focus on children's-related themes that teach a lesson or moral, or show that good can triumph over evil."
  },
  {
    "name": "fantasy",
    "description": "Take the audience to netherworld, fairy-tale places where events are unlikely to occur in real life. In mythological or legendary times, they transcend the bounds of human possibility and physical laws. Fantasy films are often in the context of the imagination, dreams, or hallucinations of a character or within the projected vision of the storyteller. Fantasy films often have an element of magic, myth, wonder, escapism, and the extraordinary. They may appeal to both children and adults, depending upon the particular film."
  },
  {
    "name": "action",
    "description": "This major genre type includes films that have tremendous impact, continuous high energy, lots of physical stunts and activity, possibly extended chase scenes, races, rescues, battles, martial arts, mountains and mountaineering, destructive disasters (floods, explosions, natural disasters, fires, etc.), fights, escapes, non-stop motion, spectacular rhythm and pacing, and adventurous heroes - all designed for pure audience escapism with the action sequences at the core of the film."
  },
  {
    "name": "crime",
    "description": "Films developed around the sinister actions of criminals, particularly bankrobbers, underworld figures, or ruthless hoodlums who operate outside the law, stealing and violently murdering their way through life. In the 1940s, a new type of crime thriller emerged, more dark and cynical. Criminal films are often categorized as post-war film noir or detective-mystery films - because of underlying similarities between these cinematic forms. Crime films encompass or cross over many levels, and may include at least these different types of films: the gangster film, the detective (or who-dun-it) film, the crime comedy, the suspense-thriller, and the police (procedural) film."
  }
];

let directors = [
  {
    "name": "Joe Wright",
    "bio": "Joe Wright is an English film director. He is best known for Pride & Prejudice (2005), Atonement (2007), Anna Karenina (2012), and Darkest Hour (2017). Wright always had an interest in the arts, especially painting. He would also make films on his Super 8 camera as well as spend time in the evenings acting in a drama club. He began his career working at his parents' puppet theatre. He also took classes at the Anna Scher Theatre School and acted professionally on stage and camera.",
    "birthYear": "1972",
    "deathYear": "N/A"
  },
  {
    "name": "Dennie Gordon",
    "bio": "After graduating from Yale's School of Drama in Directing, Gordon first gained recognition when her script for A Hard Rain was chosen by Showtime’s Discovery Program. Thanks to Steven Spielberg, a rough cut of her film attracted the attention of George Lucas who donated the film's mix at Skywalker Ranch. A Hard Rain went on to win dramatic awards at the British Short Film Festival and the Hampton's Film Festival. A Hard Rain caught the eye of David E. Kelley who enlisted Gordon to helm multiple episodes of his television series including Picket Fences, Chicago Hope, Ally McBeal, and the Practice. Gordon has directed over 100 hours of network television including such critically acclaimed series as Legion, Bloodline, Empire, Rectify, Kingdom, Power, Hell on Wheels, Madam Secretary, The Office, 30 Rock, Sports Night, and HBO’s Tracey Takes On, for which Gordon won the DGA Comedy Award. \nGordon is a sought after commercial director having completed campaigns recently with Jimmy Fallon, Betty White, and Don Cheadle. She has recently completed a short dramatic film for Huawei, which was shot in Prague.",
    "birthYear": "1953",
    "deathYear": "N/A"
  },
  {
    "name": "Gil Junger",
    "bio": "Gil Junger began his career in Hollywood by attending the University of Texas at Austin's Radio, TV, and Film School. After graduating, he became a gofer. He moved into directing television, and has worked on such series as Dharma & Greg (1997) and The Golden Girls (1985). He was nominated for an Emmy and a Director's Guild Award for directing the episode of Ellen (1994), in which the lead character reveals that she is a lesbian. He broke into feature film directing with 10 Things I Hate About You (1999). He is an avid photographer, golfer, and musician, and is in a band called \"Mid-Life Crisis\".",
    "birthYear": "1954",
    "deathYear": "N/A"
  },
  {
    "name": "Amy Heckerling",
    "bio": "Amy Heckerling studied Film and TV at New York University and got a Masters Degree in Film from The American Film Institute. Despite this education she couldn't get a break in Hollywood. However, in 1982, she made Fast Times at Ridgemont High (1982), and people started to take notice. In 1985, while Amy was pregnant, she got the idea for Look Who's Talking (1989). In 1994, Amy wrote Clueless (1995). Amy is a liberal and also an environmentalist and helps environmental charities whenever she can.",
    "birthYear": "1954",
    "deathYear": "N/A"
  },
  {
    "name": "Gary Winick",
    "bio": "Gary Winick attended and graduated Tufts University in 1984, he went on to receive Master of Fine Arts degree from both the University of Texas at Austin and the AFI Conservatory. \nWinick directed the films Out of the Rain (1991), Tadpole (2000), 13 Going on 30 (2004), and the live-action remake of Charlotte's Web (2006). His final films were Bride Wars and Letters to Juliet. He produced such films as Pieces of April (2003) and November (2004) through his New York City-based independent film production company InDigEnt, founded in 1999.",
    "birthYear": "1961",
    "deathYear": "2011"
  },
  {
    "name": "Anne Fletcher",
    "bio": "Anne Fletcher is an American film director and choreographer.\nFletcher took dance lessons as a child. At the age of 15, she appeared on the show Salute to the Superstars; later she moved to California, where she was trained by Joe Tremaine. She worked as a choreographer and worked in this capacity for six years with Jeff Andrews. The duo worked among other things on television work and music videos.\nIn her first film roles Fletcher appeared as a dancer, including The Flintstones (1994), The Mask (1994) and Tank Girl (1995). She developed choreography for the Oscar-nominated film drama Boogie Nights (1997) with Mark Wahlberg, Burt Reynolds, Julianne Moore and Heather Graham – in which she appeared herself as a dancer – as well as for the comedy A Life Less Ordinary with Ewan McGregor and Cameron Diaz.",
    "birthYear": "1966",
    "deathYear": "N/A"
  },
  {
    "name": "David Frankel",
    "bio": "Born in New York City, David Frankel is the son of former executive editor of The New York Times, Max Frankel. A Harvard University graduate, he has gone on to do great things in film.\nHis first film, Miami Rhapsody (1995), starred Sarah Jessica Parker, whom he would later work with on her series Sex and the City. From there Frankel's directorial career skyrocketed. Although he may not have a large number of movies to his name, the majority of his films have boasted A-list actors, including Anne Hathaway, Meryl Streep, Emily Blunt and Stanley Tucci, and that's just in his film The Devil Wears Prada (2006). Frankel also worked with Jennifer Aniston and Owen Wilson in Marley & Me (2008), Jack Black and Steve Martin in The Big Year (2011) and Steve Carell and Tommy Lee Jones in Hope Springs (2012).\nFrankel can also be commended for his Oscar-winning 1996 short film Dear Diary as well as his work on the series Band of Brothers, which won both a Christopher Award and an Emmy Award in 2002.",
    "birthYear": "1959",
    "deathYear": "N/A"
  },
  {
    "name": "Mark Waters",
    "bio": "The brother of writer/director Daniel Waters, Mark Waters was born in South Bend, Indiana. He worked as an actor and theater director in San Francisco after graduating from the University of Pennsylvania in 1986. After a number of years on stage, he decided to return to school and work towards his M.F.A. in directing.\nIn 1994 he accomplished this from the American Film Institute, and three years later made his directorial debut with The House of Yes, starring Freddie Prinze Jr. and Parker Posey. Based on a stage play, Waters adapted the comic script to screenplay format. The film received various award nominations from festivals and won Special Recognition at Sundance for Posey's performance.\nWaters started off the new millennium with his second directorial attempt, Head Over Heels , again starring Freddie Prinze Jr. He made his first foray into television with the TV movie Warning: Parental Advisory (2002) starring Jason Priestly and Mariel Hemingway. Waters returned to the big screen with the remake of the Disney flick, Freaky Friday (2003) starring Jamie Lee Curtis and Lindsay Lohan in the roles originated by Barbara Harris and Jodie Foster in 1976. The film was a box office success, grossing over $110 million at the domestic box office alone.\nIn 2004, he again worked with Lohan, this time in Mean Girls (2004). It was a big hit at the box office.\nSince then, he's filmed The Spiderwick Chronicles with Freddie Highmore, and the comedies Ghosts of Girlfriends Past (2009) with Matthew McConaughey and Mr. Popper's Penguins with Jim Carrey.\nIn 2008, Waters was awarded the Franklin J. Schaffner Award by the American Film Institute.",
    "birthYear": "1964",
    "deathYear": "N/A"
  },
  {
    "name": "Robert Luketic",
    "bio": "Growing up in Australia, Robert Luketic began making films at an early age. When he won the \"Best Film Award\" at the ATOM Film Festival held at Chauvel Cinema in Paddington at the age of 15, he promised himself that he would make a major Hollywood picture by the time he was 30. In 1994, he was accepted into the Victorian College of Arts School of Film and Television, one of Australia's most prestigious film schools. After only one year, he was backed for two consecutive years by sponsors AVID Technology and Samuelson Film Services.\nIn 1996 Luketic wrote and directed the short film Titsiana Booberini, a story about an ugly duckling supermarket cashier who finds how to make her life happier in the store's cosmetics aisle. He won the Queen Elizabeth II Trust Award for Outstanding Achievement in Film as well as the Best Film Award at the Aspen Shortsfest for his work. After the film screened at the Sundance Film Festival, Luketic soon found himself an agent and a manager and attention from several studios. He made the move to Los Angeles to break into Hollywood films and read scripts for two years before deciding to make his feature film directorial debut at the age of 29 in 2001 with the hilarious comedy Legally Blonde , starring Reese Witherspoon. Made on a $20 million budget, the movie was a huge hit at the box office and earned a Golden Globe nomination for \"Best Motion Picture - Musical or Comedy\" as well as a 2001 Teen Choice Award for Choice Movie of the Summer.",
    "birthYear": "1973",
    "deathYear": "N/A"
  },
  {
    "name": "Donald Petrie",
    "bio": "Petrie was born in New York City, New York, the son of Dorothea (Grundy), a television producer, actor, and novelist, and Daniel Petrie, a director. He is the brother of writer Daniel Petrie, Jr.\nPetrie has acted and guest-starred on television programs since 1976. His first directorial job was on the set of The Equalizer, a private detective television series, in 1985. Since, he has directed films such as Mystic Pizza (1988), Opportunity Knocks (1990), Grumpy Old Men (1993), The Favor (1994), Richie Rich (1994), The Associate (1996), My Favorite Martian (1999), Miss Congeniality (2000), How to Lose a Guy in 10 Days (2003), Welcome to Mooseport (2004), Just My Luck (2006) and My Life in Ruins (2009).",
    "birthYear": "1954",
    "deathYear": "N/A"
  }
];

let users = [
  {
    "username": "mgodek",
    "password": "",
    "email": "mattigodek@gmail.com",
    "dateOfBirth": "December 2",
    "favorites": []
  },
  {
    "username": "sgodek",
    "password": "",
    "email": "shanegodek@gmail.com",
    "dateOfBirth": "July 8",
    "favorites": []
  }
];

//static files come from public folder
app.use(express.static('public'));

//POST and PUT request body info is sent back as json
app.use(bodyParser.json());

//LOG request data
app.use(morgan('common'));

//GET requests
app.get('/movies', function(req, res) {
  res.json(movies);
});
app.get('/', function(req, res) {
  res.send('Welcome to myFlix!')
});
app.get('/movies/:title', function(req, res) {
  res.json(movies.find(function(movie) {
    return movie.title === req.params.title
  }));
});
app.get('/genres/:name', function(req, res) {
  res.json(genres.find(function(genre) {
    return genre.name === req.params.name
  }));
});
app.get('/directors/:name', function(req, res) {
  res.json(directors.find(function(director) {
    return director.name === req.params.name
  }));
});

//POST requests
app.post('/users', function(req, res) {
  let newUser = req.body;
  if(newUser.username === undefined) {
    res.status(400).send('Username is required for registration');
  } else {
    users.push(newUser);
    res.status(201).send(newUser.username + ' was successfully added');
  }
});

//PUT requests
app.put('/users/:username', function(req, res) {
  res.send('User information has been updated');
});
app.put('/users/:username/favorites/:title', function(req, res) {
  res.status(201).send(req.params.title + ' was added to your favorites!');
});

//DELETE requests
app.delete('/users/:username/favorites/:title', function(req, res) {
  res.status(201).send(req.params.title + ' was removed from your favorites');
});
app.delete('/users/:username', function(req, res) {
  res.status(201).send(req.params.username + '\'s account was deleted');
});

//ERROR handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

//LISTEN for requests
app.listen(8080, () =>
  console.log('myFlix is running on Port 8080')
);
