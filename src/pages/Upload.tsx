import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Upload as UploadIcon, 
  Image, 
  X, 
  Sparkles, 
  Check,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  status: "pending" | "analyzing" | "done";
  description?: string;
  tags?: string[];
}

export default function Upload() {
  const [dragActive, setDragActive] = useState(false);
  const [images, setImages] = useState<UploadedImage[]>([]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const processFiles = (files: FileList | null) => {
    if (!files) return;

    const imageFiles = Array.from(files).filter(file => 
      file.type.startsWith("image/")
    );

    if (imageFiles.length === 0) {
      toast.error("Veuillez sélectionner des fichiers image");
      return;
    }

    const newImages: UploadedImage[] = imageFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      status: "pending"
    }));

    setImages(prev => [...prev, ...newImages]);
    toast.success(`${imageFiles.length} image(s) ajoutée(s)`);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    processFiles(e.dataTransfer.files);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
  };

  const removeImage = (id: string) => {
    setImages(prev => {
      const img = prev.find(i => i.id === id);
      if (img) URL.revokeObjectURL(img.preview);
      return prev.filter(i => i.id !== id);
    });
  };

  const analyzeImage = async (id: string) => {
    setImages(prev => prev.map(img => 
      img.id === id ? { ...img, status: "analyzing" } : img
    ));

    // Simulate AI analysis - will be replaced with real Gemini API
    setTimeout(() => {
      const mockTags = ["nature", "paysage", "ciel", "montagne", "forêt"];
      const randomTags = mockTags.sort(() => 0.5 - Math.random()).slice(0, 3);
      
      setImages(prev => prev.map(img => 
        img.id === id ? { 
          ...img, 
          status: "done",
          description: "Une belle image capturée avec soin, montrant des éléments naturels.",
          tags: randomTags
        } : img
      ));
      toast.success("Analyse terminée !");
    }, 2000);
  };

  const analyzeAll = async () => {
    const pendingImages = images.filter(img => img.status === "pending");
    if (pendingImages.length === 0) {
      toast.info("Aucune image à analyser");
      return;
    }

    for (const img of pendingImages) {
      await analyzeImage(img.id);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Upload d'images
          </h1>
          <p className="text-muted-foreground">
            Glissez-déposez vos images ou cliquez pour les sélectionner
          </p>
        </div>

        {/* Drop Zone */}
        <Card 
          className={cn(
            "mb-8 transition-all duration-300 animate-slide-up",
            dragActive && "border-primary shadow-glow"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <CardContent className="p-8">
            <label className="cursor-pointer">
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleFileInput}
              />
              <div className={cn(
                "flex flex-col items-center justify-center py-12 rounded-lg border-2 border-dashed transition-all duration-300",
                dragActive 
                  ? "border-primary bg-primary/10" 
                  : "border-border hover:border-primary/50 hover:bg-secondary/50"
              )}>
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-4">
                  <UploadIcon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {dragActive ? "Déposez vos images ici" : "Glissez vos images ici"}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  ou cliquez pour sélectionner
                </p>
                <Button variant="outline" size="sm">
                  Parcourir les fichiers
                </Button>
              </div>
            </label>
          </CardContent>
        </Card>

        {/* Uploaded Images */}
        {images.length > 0 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                Images uploadées ({images.length})
              </h2>
              <Button onClick={analyzeAll} className="gap-2">
                <Sparkles className="w-4 h-4" />
                Analyser tout
              </Button>
            </div>

            <div className="grid gap-4">
              {images.map((img) => (
                <Card key={img.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    {/* Image Preview */}
                    <div className="relative w-full md:w-48 h-48 flex-shrink-0">
                      <img
                        src={img.preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removeImage(img.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-background/80 text-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Image Info */}
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-foreground truncate max-w-xs">
                            {img.file.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {(img.file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>

                        {img.status === "pending" && (
                          <Button 
                            size="sm" 
                            onClick={() => analyzeImage(img.id)}
                            className="gap-2"
                          >
                            <Sparkles className="w-4 h-4" />
                            Analyser
                          </Button>
                        )}
                        {img.status === "analyzing" && (
                          <div className="flex items-center gap-2 text-primary">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-sm">Analyse...</span>
                          </div>
                        )}
                        {img.status === "done" && (
                          <div className="flex items-center gap-2 text-green-500">
                            <Check className="w-4 h-4" />
                            <span className="text-sm">Terminé</span>
                          </div>
                        )}
                      </div>

                      {img.description && (
                        <p className="text-sm text-muted-foreground mb-3">
                          {img.description}
                        </p>
                      )}

                      {img.tags && img.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {img.tags.map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button size="lg" className="gap-2">
                <Image className="w-5 h-5" />
                Sauvegarder dans la bibliothèque
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
