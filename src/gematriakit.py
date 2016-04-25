#!/usr/bin/python



from hebrew_numbers import gematria_to_int as gti
import pandas as pd
import scipy.stats
import numpy as np
import matplotlib.pyplot as pltthon
import scipy.cluster.hierarchy as sch

from matplotlib.pyplot import plot, ion, show
import matplotlib.pyplot as plt


tanach = pd.read_pickle('../data/tanach.pickle')


def words(sefer):
    sefer = tanach[tanach['book']==sefer]
    if sefer.empty: return

    words = []
    pasukim = sefer['string']
    for p in pasukim:
        for word in p.split(' '):
                words.append(word)

    return words

def gematriaze(wordlist):
    return map(gti, wordlist)

def histogram(book):
    wds = words(book)
    gematria = gematriaze(wds)
    hist, bins = np.histogram(gematria, bins =len(gematria)/2)
    plt.figure()
    center = (bins[:-1] + bins[1:]) / 2
    plt.bar(center, hist)

def dimensions(n):
    # Minimizes the dimensions of a grid (xy) to plot n elements
    import math
    s = math.sqrt(float(n))
    x = int(math.ceil(s))
    y = int(math.floor(s))
    return (x,y)

def transform(dims, n):
    x,y = dims
    a = n/y
    b = n%(y)
    return (a,b)

def plot_gematria():
    plt.title('Gematrias across {0}'.format(book))
    plt.ylabel('Gematria Value')
    plt.xlabel('Nth Sentence in {0}'.format(book))
    wds = words(book)
    gem = np.array(gematriaze(wds))
    data = gem[0:gem.shape[0]/2]
    width=data.shape[0]/100
    ys = data[:(data.size // width) * width].reshape(-1, width).mean(axis=1)
    xs = np.arange(ys.shape[0])
    plt.bar(xs,ys)

def plot_all_gematrias(booklist):

    books = booklist if len(booklist)>0 else np.unique(np.array(tanach['book']))

    dims = dimensions(books.shape[0])
    f, axes = plt.subplots(*dims, figsize=(20,20))
    f.suptitle('Gematria Values for Nth Sentence Across all Books in Bible [old testament]')
    for i in range(books.shape[0]):
        x,y = transform(dims,i)
        ax = axes[x][y]
        book = books[i]
        ax.set_title('{0}'.format(book))
        # ax.set_ylabel('Gematria Value')
        # ax.set_xlabel('Nth Sentence in {0}'.format(book))
        ax.set_yticklabels([])
        ax.set_xticklabels([])
        wds = words(book)
        gem = np.array(gematriaze(wds))
        data = gem[0:gem.shape[0]/2]
        width=1#data.shape[0]/100
        ys = data[:(data.size // width) * width].reshape(-1, width).mean(axis=1)
        xs = np.arange(ys.shape[0])
        ax.bar(xs,ys)

def plot_correlations(booklist):
    from mpl_toolkits.axes_grid1 import make_axes_locatable
    fig, ax = plt.subplots()

    books = booklist if len(booklist)>0 else np.unique(np.array(tanach['book']))
    mesh = []
    for b in books:
        wds = words(b)
        gem = gematriaze(wds)
        mesh.append(gem)

    minsize = min(*[len(mesh[i]) for i in range(len(mesh))])
    mesh = [mesh[i][0:minsize] for i in range(len(mesh))]
    meshnum = np.array(mesh)


    plot_matr = np.dot(meshnum, meshnum.T)

    Z = sch.linkage(plot_matr)
    leaves = sch.leaves_list(Z)

    plot_matr = plot_matr[leaves][:,leaves]

    ax.set_yticks(np.arange(len(books))+0.5)
    ax.set_yticklabels(np.array(books)[leaves])

    ax.set_xticks(np.arange(len(books))+0.5)
    ax.set_xticklabels(np.array(books)[leaves], rotation='vertical')
    # pc = ax.pcolormesh(nmeshnum,vmin=0, vmax=np.max(meshnum))
    pc = ax.pcolormesh(plot_matr)
    div = make_axes_locatable(ax)
    cax = div.append_axes("right", size="2%", pad=0.05)
    cbar = plt.colorbar(pc, cax=cax)

    fig.tight_layout()

def plot_colormesh(booklist, sort=False):
    from mpl_toolkits.axes_grid1 import make_axes_locatable
    fig, ax = plt.subplots()

    books = booklist if len(booklist)>0 else np.unique(np.array(tanach['book']))
    mesh = []
    for b in books:
        wds = words(b)
        gem = gematriaze(wds)
        mesh.append(gem)

    minsize = min(*[len(mesh[i]) for i in range(len(mesh))])

    if sort:
        mesh = [sorted(mesh[i][0:minsize]) for i in range(len(mesh))]
    else:
        mesh = [mesh[i][0:minsize] for i in range(len(mesh))]

    plot_matr = np.array(mesh)

    ax.set_yticks(np.arange(len(books))+0.5)
    ax.set_yticklabels(np.array(books))

    pc = ax.pcolormesh(plot_matr,vmin=0, vmax=np.max(plot_matr))
    div = make_axes_locatable(ax)
    cax = div.append_axes("right", size="2%", pad=0.05)
    cbar = plt.colorbar(pc, cax=cax)

    fig.tight_layout()


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
    'Nehemiah'
]

all = list(torah)
all.extend(neviim)
all.extend(ketubim)
