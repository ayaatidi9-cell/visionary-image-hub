import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Eye, 
  Sparkles, 
  Upload, 
  Search, 
  Tags, 
  Shield,
  ArrowRight,
  Image,
  Zap
} from "lucide-react";

const features = [
  {
    icon: Upload,
    title: "Upload Intelligent",
    description: "Glissez-déposez vos images et laissez l'IA faire le reste"
  },
  {
    icon: Tags,
    title: "Tags Automatiques",
    description: "Génération automatique de tags grâce à Gemini AI"
  },
  {
    icon: Search,
    title: "Recherche Avancée",
    description: "Trouvez vos images par tags, texte ou date"
  },
  {
    icon: Shield,
    title: "Sécurisé",
    description: "Vos images sont protégées et accessibles uniquement par vous"
  }
];

export default function Index() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-glow pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8 animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Propulsé par Gemini AI</span>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                <span className="text-foreground">Gérez vos images avec</span>
                <br />
                <span className="text-gradient">l'Intelligence Artificielle</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                AsMe Vision analyse automatiquement vos images, génère des descriptions 
                et des tags intelligents pour une organisation parfaite.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth?mode=register">
                <Button variant="hero" className="group">
                  Commencer gratuitement
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" size="lg">
                  Se connecter
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">1000+</div>
                <div className="text-sm text-muted-foreground">Images analysées</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">99%</div>
                <div className="text-sm text-muted-foreground">Précision IA</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">5s</div>
                <div className="text-sm text-muted-foreground">Temps d'analyse</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Fonctionnalités Puissantes
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Tout ce dont vous avez besoin pour gérer et organiser votre bibliothèque d'images
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className={`group p-6 rounded-xl gradient-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow animate-slide-up stagger-${index + 1}`}
                  style={{ opacity: 0 }}
                >
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="relative py-24 px-4 bg-secondary/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Comment ça marche ?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto">
                <Upload className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="text-4xl font-bold text-primary">1</div>
              <h3 className="text-xl font-semibold text-foreground">Uploadez</h3>
              <p className="text-muted-foreground">
                Glissez-déposez vos images ou sélectionnez-les depuis votre appareil
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto">
                <Zap className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="text-4xl font-bold text-primary">2</div>
              <h3 className="text-xl font-semibold text-foreground">Analysez</h3>
              <p className="text-muted-foreground">
                L'IA analyse automatiquement vos images et génère des tags
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto">
                <Image className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="text-4xl font-bold text-primary">3</div>
              <h3 className="text-xl font-semibold text-foreground">Organisez</h3>
              <p className="text-muted-foreground">
                Retrouvez facilement vos images grâce à la recherche intelligente
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="relative rounded-2xl gradient-card border border-border p-12 text-center overflow-hidden">
            <div className="absolute inset-0 gradient-glow opacity-50" />
            <div className="relative space-y-6">
              <Eye className="w-16 h-16 text-primary mx-auto animate-float" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Prêt à commencer ?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Rejoignez AsMe Vision et découvrez une nouvelle façon de gérer vos images
              </p>
              <Link to="/auth?mode=register">
                <Button variant="hero" className="group">
                  Créer un compte gratuit
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-4 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Eye className="w-6 h-6 text-primary" />
              <span className="font-semibold text-foreground">AsMe Vision</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 AsMe Vision. Projet scolaire.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
