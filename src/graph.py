from gematriakit import *
# Plotting Correlations
plot_correlations(np.array(torah))
plt.savefig('./graphs/gematria_torah_correlation.jpg', dpi=300)
plot_correlations(np.array(neviim))
plt.savefig('./graphs/gematria_neviim_correlation.jpg', dpi=300)
plot_correlations(np.array(ketubim))
plt.savefig('./graphs/gematria_ketubim_correlation.jpg', dpi=300)

# Plotting Correlations
plot_colormesh(np.array(torah))
plt.savefig('./graphs/gematria_torah.jpg', dpi=300)
plot_colormesh(np.array(neviim))
plt.savefig('./graphs/gematria_neviim.jpg', dpi=300)
plot_colormesh(np.array(ketubim))
plt.savefig('./graphs/gematria_ketubim.jpg', dpi=300)
