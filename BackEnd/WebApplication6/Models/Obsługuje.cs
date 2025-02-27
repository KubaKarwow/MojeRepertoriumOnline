using System;
using System.Collections.Generic;

namespace WebApplication6.Models;

public partial class Obsługuje
{
    public int JezykId { get; set; }

    public int TłumaczId { get; set; }

    public int IlośćWykonanychTłumaczeń { get; set; }

    public string Poziom { get; set; } = null!;

    public virtual Jezyk Jezyk { get; set; } = null!;

    public virtual Tłumacz Tłumacz { get; set; } = null!;
}
