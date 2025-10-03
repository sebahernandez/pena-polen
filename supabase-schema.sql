-- Esquema de base de datos para la aplicación de polenes
-- Ejecuta estos comandos en tu panel de Supabase SQL Editor

-- Tabla principal para registros de polen
CREATE TABLE pollen_records (
  id BIGSERIAL PRIMARY KEY,
  city VARCHAR(100) NOT NULL,
  date TEXT NOT NULL,
  period TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla para niveles específicos de polen por tipo
CREATE TABLE pollen_levels (
  id BIGSERIAL PRIMARY KEY,
  pollen_record_id BIGINT REFERENCES pollen_records(id) ON DELETE CASCADE,
  type VARCHAR(100) NOT NULL,
  level VARCHAR(50) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla para pronósticos de polen
CREATE TABLE pollen_forecasts (
  id BIGSERIAL PRIMARY KEY,
  pollen_record_id BIGINT REFERENCES pollen_records(id) ON DELETE CASCADE,
  forecast_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejorar el rendimiento
CREATE INDEX idx_pollen_records_city ON pollen_records(city);
CREATE INDEX idx_pollen_records_created_at ON pollen_records(created_at);
CREATE INDEX idx_pollen_levels_record_id ON pollen_levels(pollen_record_id);
CREATE INDEX idx_pollen_levels_type ON pollen_levels(type);
CREATE INDEX idx_pollen_forecasts_record_id ON pollen_forecasts(pollen_record_id);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at en pollen_records
CREATE TRIGGER update_pollen_records_updated_at 
    BEFORE UPDATE ON pollen_records 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Políticas de seguridad RLS (Row Level Security)
-- Habilitar RLS en todas las tablas
ALTER TABLE pollen_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE pollen_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE pollen_forecasts ENABLE ROW LEVEL SECURITY;

-- Permitir lectura pública para todas las tablas
CREATE POLICY "Allow public read access" ON pollen_records FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON pollen_levels FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON pollen_forecasts FOR SELECT USING (true);

-- Permitir inserción desde la aplicación (usando service role o authenticated users)
CREATE POLICY "Allow authenticated insert" ON pollen_records FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated insert" ON pollen_levels FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated insert" ON pollen_forecasts FOR INSERT WITH CHECK (true);

-- Comentarios para documentación
COMMENT ON TABLE pollen_records IS 'Registros principales de datos de polen por ciudad y fecha';
COMMENT ON TABLE pollen_levels IS 'Niveles específicos de polen por tipo (ej: plátano oriental, arce, etc.)';
COMMENT ON TABLE pollen_forecasts IS 'Pronósticos y recomendaciones para alérgicos';

COMMENT ON COLUMN pollen_records.city IS 'Ciudad donde se midió el polen';
COMMENT ON COLUMN pollen_records.date IS 'Fecha o período de medición';
COMMENT ON COLUMN pollen_records.period IS 'Período específico de medición (ej: semana del X al Y)';

COMMENT ON COLUMN pollen_levels.type IS 'Tipo de polen (ej: plátano oriental, arce, morera)';
COMMENT ON COLUMN pollen_levels.level IS 'Nivel del polen (ALTOS, MEDIOS, BAJOS)';
COMMENT ON COLUMN pollen_levels.description IS 'Descripción adicional del nivel';

COMMENT ON COLUMN pollen_forecasts.forecast_text IS 'Texto completo del pronóstico y recomendaciones';