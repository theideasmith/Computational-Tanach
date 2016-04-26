from gematriakit import *

plot_colormesh(np.array(all), sort=True)
plt.savefig('../graphs/gematria_all_sorted.jpg')

plot_colormesh(np.array(all))
plt.savefig('../graphs/gematria_all.jpg',dpi=600)

plot_correlations(np.array(all))
plt.savefig('../graphs/gematria_correlations.jpg')
