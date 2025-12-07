import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Users, 
  Image, 
  Trash2, 
  Search,
  Shield,
  Eye
} from "lucide-react";
import { toast } from "sonner";

// Mock data - will be replaced with real data
const mockUsers = [
  { id: "1", name: "John Doe", email: "john@example.com", imageCount: 45, createdAt: "2024-01-01" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", imageCount: 32, createdAt: "2024-01-05" },
  { id: "3", name: "Bob Wilson", email: "bob@example.com", imageCount: 18, createdAt: "2024-01-10" },
  { id: "4", name: "Alice Brown", email: "alice@example.com", imageCount: 67, createdAt: "2024-01-12" }
];

const mockAllImages = [
  { id: "1", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100", owner: "John Doe", tags: ["nature", "montagne"] },
  { id: "2", url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=100", owner: "Jane Smith", tags: ["forêt", "nature"] },
  { id: "3", url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=100", owner: "Bob Wilson", tags: ["vallée", "rivière"] },
  { id: "4", url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=100", owner: "Alice Brown", tags: ["colline", "ciel"] },
  { id: "5", url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=100", owner: "John Doe", tags: ["lac", "montagne"] },
  { id: "6", url: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=100", owner: "Jane Smith", tags: ["forêt", "automne"] }
];

type Tab = "users" | "images";

export default function Admin() {
  const [activeTab, setActiveTab] = useState<Tab>("users");
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState(mockUsers);
  const [images, setImages] = useState(mockAllImages);

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    toast.success("Utilisateur supprimé");
  };

  const deleteImage = (id: string) => {
    setImages(prev => prev.filter(i => i.id !== id));
    toast.success("Image supprimée");
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredImages = images.filter(i => 
    i.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Panneau Admin
            </h1>
          </div>
          <p className="text-muted-foreground">
            Gérez les utilisateurs et les images de la plateforme
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <Card className="animate-slide-up">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Utilisateurs</p>
                  <p className="text-3xl font-bold text-foreground">{users.length}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Images</p>
                  <p className="text-3xl font-bold text-foreground">{images.length}</p>
                </div>
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
                  <Image className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant={activeTab === "users" ? "default" : "outline"}
            onClick={() => setActiveTab("users")}
            className="gap-2"
          >
            <Users className="w-4 h-4" />
            Utilisateurs
          </Button>
          <Button
            variant={activeTab === "images" ? "default" : "outline"}
            onClick={() => setActiveTab("images")}
            className="gap-2"
          >
            <Image className="w-4 h-4" />
            Toutes les images
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder={activeTab === "users" ? "Rechercher un utilisateur..." : "Rechercher par propriétaire ou tag..."}
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Users Tab */}
        {activeTab === "users" && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Liste des utilisateurs</CardTitle>
              <CardDescription>{filteredUsers.length} utilisateur(s)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-secondary/50">
                      <TableHead>Nom</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Images</TableHead>
                      <TableHead>Inscrit le</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell className="text-muted-foreground">{user.email}</TableCell>
                        <TableCell>{user.imageCount}</TableCell>
                        <TableCell className="text-muted-foreground">{user.createdAt}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteUser(user.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Images Tab */}
        {activeTab === "images" && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Toutes les images</CardTitle>
              <CardDescription>{filteredImages.length} image(s)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredImages.map((img) => (
                  <div key={img.id} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30 border border-border">
                    <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={img.url}
                        alt="Image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {img.owner}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {img.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => deleteImage(img.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
