import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Image, 
  Star, 
  Upload, 
  TrendingUp,
  Clock
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// Mock data - will be replaced with real data
const stats = {
  totalImages: 156,
  favorites: 24,
  thisMonth: 18,
  tags: 89
};

const imageTypeData = [
  { name: "Nature", value: 45, color: "hsl(174, 72%, 56%)" },
  { name: "Architecture", value: 25, color: "hsl(199, 89%, 48%)" },
  { name: "Portrait", value: 20, color: "hsl(280, 60%, 60%)" },
  { name: "Autre", value: 10, color: "hsl(220, 30%, 50%)" }
];

const recentImages = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200",
    title: "Montagne au lever du soleil",
    date: "Il y a 2 heures"
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=200",
    title: "Forêt verdoyante",
    date: "Il y a 5 heures"
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=200",
    title: "Vallée avec rivière",
    date: "Hier"
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=200",
    title: "Collines ondulantes",
    date: "Hier"
  }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Tableau de bord
          </h1>
          <p className="text-muted-foreground">
            Bienvenue ! Voici un aperçu de votre bibliothèque.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="animate-slide-up stagger-1" style={{ opacity: 0 }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Images</p>
                  <p className="text-3xl font-bold text-foreground">{stats.totalImages}</p>
                </div>
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
                  <Image className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up stagger-2" style={{ opacity: 0 }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Favoris</p>
                  <p className="text-3xl font-bold text-foreground">{stats.favorites}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up stagger-3" style={{ opacity: 0 }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Ce mois</p>
                  <p className="text-3xl font-bold text-foreground">{stats.thisMonth}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up stagger-4" style={{ opacity: 0 }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tags uniques</p>
                  <p className="text-3xl font-bold text-foreground">{stats.tags}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Upload className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Types d'images</CardTitle>
              <CardDescription>Répartition par catégorie</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={imageTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {imageTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(222, 47%, 8%)",
                        border: "1px solid hsl(222, 30%, 18%)",
                        borderRadius: "8px",
                        color: "hsl(210, 40%, 98%)"
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {imageTypeData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Images */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Images récentes
              </CardTitle>
              <CardDescription>Vos derniers uploads</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentImages.map((img) => (
                  <div key={img.id} className="flex items-center gap-4 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={img.url}
                        alt={img.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {img.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{img.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
