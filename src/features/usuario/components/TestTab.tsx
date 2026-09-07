// TestTab.tsx
// Pestaña "Test": pestaña reservada, sin bloque dinámico asociado aún.
import React from "react";
import Section from "../../../components/layout/Section";
import Card from "../../../components/layout/Card";

const TestTab: React.FC = () => (
  <div className="space-y-4">
    <Section
      title="Test"
      description="Contenido de prueba."
    >
      <Card bodyClassName="space-y-6">
        <p className="text-sm text-slate-500">
          Esta pestaña está reservada para contenido de prueba. Todavía no tiene un bloque dinámico asociado.
        </p>
      </Card>
    </Section>
  </div>
);

export default TestTab;