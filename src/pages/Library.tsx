import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  Search, 
  Filter, 
  Star, 
  StarOff,
  Trash2,
  Calendar,
  Grid,
  List,
  Eye
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data - will be replaced with real data from Supabase
const mockImages = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    description: "Magnifique paysage de montagne au lever du soleil",
    tags: ["nature", "montagne", "paysage"],
    favorite: true,
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400",
    description: "Forêt verdoyante avec brume matinale",
    tags: ["forêt", "nature", "brume"],
    favorite: false,
    createdAt: "2024-01-14"
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400",
    description: "Vallée avec rivière serpentant à travers",
    tags: ["vallée", "rivière", "nature"],
    favorite: true,
    createdAt: "2024-01-13"
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400",
    description: "Collines ondulantes sous un ciel nuageux",
    tags: ["colline", "ciel", "paysage"],
    favorite: false,
    createdAt: "2024-01-12"
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400",
    description: "Lac de montagne aux eaux cristallines",
    tags: ["lac", "montagne", "eau"],
    favorite: false,
    createdAt: "2024-01-11"
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400",
    description: "Chemin forestier couvert de feuilles d'automne",
    tags: ["forêt", "automne", "chemin"],
    favorite: true,
    createdAt: "2024-01-10"
  }
];

type ViewMode = "grid" | "list";
type FilterType = "all" | "favorites" | "recent";

export default function Library() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [images, setImages] = useState(mockImages);
  const [selectedImage, setSelectedImage] = useState<typeof mockImages[0] | null>(null);

  const toggleFavorite = (id: string) => {
    setImages(prev => prev.map(img => 
      img.id === id ? { ...img, favorite: !img.favorite } : img
    ));
  };

  const deleteImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const filteredImages = images.filter(img => {
    // Search filter
    const searchMatch = 
      img.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Type filter
    const typeMatch = 
      filterType === "all" ? true :
      filterType === "favorites" ? img.favorite :
      true;

    return searchMatch && typeMatch;
  });

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Ma Bibliothèque
          </h1>
          <p className="text-muted-foreground">
            {filteredImages.length} image(s) dans votre collection
          </p>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 animate-slide-up">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Rechercher par tag ou description..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant={filterType === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("all")}
            >
              Tout
            </Button>
            <Button
              variant={filterType === "favorites" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("favorites")}
              className="gap-2"
            >
              <Star className="w-4 h-4" />
              Favoris
            </Button>
            <Button
              variant={filterType === "recent" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("recent")}
              className="gap-2"
            >
              <Calendar className="w-4 h-4" />
              Récent
            </Button>
          </div>

          {/* View Mode */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-secondary">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-2 rounded-md transition-colors",
                viewMode === "grid" ? "bg-card text-foreground" : "text-muted-foreground"
              )}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-2 rounded-md transition-colors",
                viewMode === "list" ? "bg-card text-foreground" : "text-muted-foreground"
              )}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Images Grid/List */}
        {filteredImages.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              Aucune image trouvée
            </h3>
            <p className="text-muted-foreground">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {filteredImages.map((img) => (
              <Card 
                key={img.id} 
                className="group overflow-hidden hover:shadow-glow transition-all duration-300"
              >
                <div className="relative aspect-[4/3]">
                  <img
                    src={img.url}
                    alt={img.description}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-sm text-foreground line-clamp-2 mb-2">
                        {img.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {img.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 rounded bg-primary/20 text-primary text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setSelectedImage(img)}
                      className="p-2 rounded-full bg-background/80 text-foreground hover:bg-background transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleFavorite(img.id)}
                      className={cn(
                        "p-2 rounded-full bg-background/80 transition-colors",
                        img.favorite ? "text-yellow-500" : "text-foreground hover:text-yellow-500"
                      )}
                    >
                      {img.favorite ? <Star className="w-4 h-4 fill-current" /> : <StarOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => deleteImage(img.id)}
                      className="p-2 rounded-full bg-background/80 text-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Favorite Badge */}
                  {img.favorite && (
                    <div className="absolute top-2 left-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            {filteredImages.map((img) => (
              <Card key={img.id} className="flex overflow-hidden hover:shadow-glow transition-all duration-300">
                <div className="w-32 h-24 flex-shrink-0">
                  <img
                    src={img.url}
                    alt={img.description}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-4 flex items-center justify-between">
                  <div>
                    <p className="text-foreground mb-1">{img.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {img.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded bg-primary/20 text-primary text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleFavorite(img.id)}
                      className={cn(
                        "p-2 rounded-full transition-colors",
                        img.favorite ? "text-yellow-500" : "text-muted-foreground hover:text-yellow-500"
                      )}
                    >
                      {img.favorite ? <Star className="w-5 h-5 fill-current" /> : <StarOff className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={() => deleteImage(img.id)}
                      className="p-2 rounded-full text-muted-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Image Preview Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div 
              className="max-w-4xl w-full bg-card rounded-xl overflow-hidden shadow-card animate-slide-up"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.description}
                className="w-full max-h-[60vh] object-contain bg-black"
              />
              <div className="p-6">
                <p className="text-foreground mb-4">{selectedImage.description}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedImage.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
