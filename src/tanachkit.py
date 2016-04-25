import pandas as pd

tanach = pd.read_pickle('../data/tanach.pickle')

def getpasuk(sefer, perek, pasuk):
    return tanach[(tanach['book']==sefer)&(tanach['perek']==perek)&(tanach['pasuk']==pasuk)]


torah = [ 'Genesis',
    'Exodus',
    'Leviticus',
    'Numbers',
    'Deuteronomy']

neviim = [
    'Joshua',
    'Judges',
    'Samuel_1',
    'Samuel_2',
    'Kings_1',
    'Kings_2',
    'Isaiah',
    'Jeremiah',
    'Ezekiel'
]

trei_asar = [
    "Hosea",
    "Joel",
    "Amos",
    "Obadiah",
    "Jonah",
    "Micah",
    "Nahum",
    "Habakkuk",
    "Zephaniah",
    "Haggai",
    "Zechariah",
    "Malachi",

]

ketubim = [
    'Psalms',
    'Proverbs',
    'Job',
    'Song_of_Songs',
    'Ruth',
    'Lamentations',
    'Ecclesiastes',
    'Esther',
    'Daniel',
    'Ezra',
    'Nehemiah',
    'Chronicles_1',
    'Chronicles_2'
]
all = list(torah)
all.extend(neviim)
all.extend(trei_asar)
all.extend(ketubim)

tanach.book = tanach.book.astype("category")
tanach.book.cat.set_categories(all, inplace=True)
tanach.sort('book', inplace=True)


